"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SmoothCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 25, y: 25 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [hoverMessage, setHoverMessage] = useState("AAaaA!! headache");

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 500);
  }, []);

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (ev: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateMousePosition(ev));
    };

    const handleMouseEnterLink = () => {
      setIsHoveringLink(true);
      setHoverMessage("Will you Click me!?");
    };
    
    const handleMouseLeaveLink = () => {
      setIsHoveringLink(false);
      setHoverMessage("AAaaA!! headache");
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnterLink as EventListener);
      element.addEventListener('mouseleave', handleMouseLeaveLink as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      cancelAnimationFrame(rafId);

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnterLink as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeaveLink as EventListener);
      });
    };
  }, [updateMousePosition]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundImage: isHoveringLink ? 'url(/hover-photo.jpg)' : 'url(/cursor-photo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHoveringLink ? 3 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      <AnimatePresence>
        {isMoving && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              left: mousePosition.x + 20,
              top: mousePosition.y - 30,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              pointerEvents: 'none',
              zIndex: 10000,
            }}
          >
            {hoverMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmoothCursor;