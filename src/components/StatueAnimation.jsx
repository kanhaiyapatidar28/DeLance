import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const propsList = [
  '/1.png', '/2.png', '/3.png', '/4.png',
  '/5.png', '/6.png', '/7.png', '/8.png'
];

// Props will spread in a radial pattern
const PROP_DISTANCE = 220; // Increased
const PROP_FINAL_SIZE = 100; // Increased

// ---- Adjust to place the explode origin over the statue's head ----
const EXPLOSION_ORIGIN = { top: '30%', left: '60%' };
// ---- Adjust to position the detached cutout head over the statue's head ----
const HEAD_POS = { top: '1%', left: '50%', width: '42%' };

const StatueAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const propsRefs = useRef([]);
  const headRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovered) {
        // 1. Lift and tilt the head dramatically (hinge-like) from the cap's right edge
        gsap.to(headRef.current, {
          y: -50, // Lift a bit more
          x: 0,   // Keeping X at 0 since we're hinging on the cap's own right side
          rotation: 80, 
          opacity: 1,
          duration: 0.45, 
          ease: 'power2.out'
        });

        // 2. Explode the props radially
        propsRefs.current.forEach((el, i) => {
          if (!el) return;
          const angle = (i / propsList.length) * Math.PI * 1.5 + Math.PI * 0.75; 
          const targetX = Math.cos(angle) * (PROP_DISTANCE + Math.random() * 40);
          const targetY = Math.sin(angle) * (PROP_DISTANCE + Math.random() * 40);

          gsap.fromTo(el, 
            { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
            { 
              x: targetX, 
              y: targetY, 
              scale: 1, 
              opacity: 1, 
              rotation: Math.random() * 60 - 30,
              duration: 0.8, 
              ease: 'elastic.out(1, 0.75)',
              delay: i * 0.05
            }
          );

          // 3. Subtle floating loop
          gsap.to(el, {
            y: "+=12",
            x: "+=8",
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.8 + (i * 0.1)
          });
        });
      } else {
        // Retract head
        gsap.to(headRef.current, {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });

        // Retract props
        propsRefs.current.forEach((el) => {
          if (!el) return;
          gsap.killTweensOf(el);
          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        cursor: 'pointer', 
        userSelect: 'none',
        zIndex: 50
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-is-hovered={isHovered}
    >
      {/* DEFAULT IMAGE — person with laptop; fades out on hover */}
      <img
        src="/hero-photo.png"
        alt="Freelancer at laptop"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '1rem',
          transition: 'opacity 0.5s ease',
          opacity: isHovered ? 0 : 1,
          zIndex: 1,
        }}
      />

      {/* HOVER IMAGE — statue body (without head); fades in on hover */}
      <img
        src="/hero-photo3.png"
        alt="Greek Statue"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '1rem',
          transition: 'opacity 0.5s ease',
          opacity: isHovered ? 1 : 0,
          zIndex: 2,
        }}
      />

      {/* DETACHED HEAD — lifts & tilts on hover */}
      <img
        ref={headRef}
        src="/open head.png"
        alt="Statue open head"
        style={{
          position: 'absolute',
          top: HEAD_POS.top,
          left: HEAD_POS.left,
          width: HEAD_POS.width,
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0,
          transformOrigin: '60% 16%',
        }}
      />

      {/* FLOATING PROPS */}
      <div
        style={{
          position: 'absolute',
          top: EXPLOSION_ORIGIN.top,
          left: EXPLOSION_ORIGIN.left,
          width: 0,
          height: 0,
          zIndex: 100,
        }}
      >
        {propsList.map((src, i) => (
          <img
            key={src}
            ref={(el) => (propsRefs.current[i] = el)}
            src={src}
            alt={`prop-${i}`}
            style={{
              position: 'absolute',
              width: `${PROP_FINAL_SIZE}px`,
              height: `${PROP_FINAL_SIZE}px`,
              marginLeft: `-${PROP_FINAL_SIZE/2}px`,
              marginTop: `-${PROP_FINAL_SIZE/2}px`,
              objectFit: 'contain',
              pointerEvents: 'none',
              opacity: 0,
              display: 'block'
            }}
          />
        ))}
      </div>



      {/* DEDICATED HOVER TRIGGER OVERLAY */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20, 
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default StatueAnimation;
