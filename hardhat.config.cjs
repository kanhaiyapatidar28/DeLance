require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./src/artifacts", // We want artifacts to be generated inside src so React can read them easily
  },
  networks: {
    hardhat: {
      chainId: 1337 // Standard local hardhat chain id
    }
  }
};
