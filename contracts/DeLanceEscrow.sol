// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DeLanceEscrow {
    enum JobStatus { Open, InProgress, Completed, Disputed }

    struct Job {
        uint256 id;
        address payable client;
        address payable freelancer;
        uint256 amount;
        string title;
        JobStatus status;
    }

    uint256 public jobCount = 0;
    mapping(uint256 => Job) public jobs;

    event JobCreated(uint256 id, address client, uint256 amount, string title);
    event JobAssigned(uint256 id, address freelancer);
    event JobCompleted(uint256 id, address freelancer, uint256 amount);
    event JobDisputed(uint256 id);

    modifier onlyClient(uint256 _id) {
        require(msg.sender == jobs[_id].client, "Only the client can perform this action");
        _;
    }

    modifier onlyFreelancer(uint256 _id) {
        require(msg.sender == jobs[_id].freelancer, "Only the freelancer can perform this action");
        _;
    }

    function createJob(string memory _title) public payable {
        require(msg.value > 0, "Job must have a positive escrow amount");

        jobCount++;
        jobs[jobCount] = Job(
            jobCount,
            payable(msg.sender),
            payable(address(0)),
            msg.value,
            _title,
            JobStatus.Open
        );

        emit JobCreated(jobCount, msg.sender, msg.value, _title);
    }

    function assignFreelancer(uint256 _id, address payable _freelancer) public onlyClient(_id) {
        require(jobs[_id].status == JobStatus.Open, "Job is not open");
        require(_freelancer != address(0), "Invalid freelancer address");
        
        jobs[_id].freelancer = _freelancer;
        jobs[_id].status = JobStatus.InProgress;

        emit JobAssigned(_id, _freelancer);
    }

    function completeJob(uint256 _id) public onlyClient(_id) {
        require(jobs[_id].status == JobStatus.InProgress, "Job is not in progress");

        jobs[_id].status = JobStatus.Completed;
        
        // Release funds to freelancer
        jobs[_id].freelancer.transfer(jobs[_id].amount);

        emit JobCompleted(_id, jobs[_id].freelancer, jobs[_id].amount);
    }

    function raiseDispute(uint256 _id) public {
        require(msg.sender == jobs[_id].client || msg.sender == jobs[_id].freelancer, "Only parties involved can dispute");
        require(jobs[_id].status == JobStatus.InProgress, "Job must be in progress");

        jobs[_id].status = JobStatus.Disputed;

        emit JobDisputed(_id);
    }
}
