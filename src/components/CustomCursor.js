import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePosition(newPos);
      
      // Magnetic effect for interactive elements
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement && (hoveredElement.tagName === 'A' || hoveredElement.tagName === 'BUTTON' || hoveredElement.classList.contains('btn') || hoveredElement.classList.contains('admin-panel-overlay'))) {
        const rect = hoveredElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (distance < 50) {
          const pullStrength = Math.max(0, 1 - distance / 50) * 0.3;
          setTargetPosition({
            x: e.clientX + (centerX - e.clientX) * pullStrength,
            y: e.clientY + (centerY - e.clientY) * pullStrength
          });
        } else {
          setTargetPosition(newPos);
        }
      } else {
        setTargetPosition(newPos);
      }
      
      // Create sparkles on movement
      if (Math.random() > 0.8) {
        const sparkleId = `sparkle_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const newSparkle = {
          id: sparkleId,
          x: Math.max(0, Math.min(window.innerWidth, e.clientX + (Math.random() - 0.5) * 30)),
          y: Math.max(0, Math.min(window.innerHeight, e.clientY + (Math.random() - 0.5) * 30)),
          size: Math.max(2, Math.min(6, Math.random() * 4 + 2))
        };
        setSparkles(prev => [...prev, newSparkle].slice(-10));
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== sparkleId));
        }, 1000);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setCursorVariant('click');
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
      setCursorVariant('default');
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        setIsHovering(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      x: targetPosition.x - 16,
      y: targetPosition.y - 16,
      scale: 1,
      rotate: 0,
      borderRadius: '50%'
    },
    hover: {
      x: targetPosition.x - 20,
      y: targetPosition.y - 20,
      scale: 1.5,
      rotate: 45,
      borderRadius: '20%'
    },
    click: {
      x: targetPosition.x - 12,
      y: targetPosition.y - 12,
      scale: 0.8,
      rotate: 180,
      borderRadius: '10%'
    }
  };

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="new-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          background: cursorVariant === 'hover' 
            ? 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #667eea)'
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference'
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
      />
      
      {/* Cursor Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: 'radial-gradient(circle, #fff, transparent)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99998
          }}
          initial={{
            x: sparkle.x,
            y: sparkle.y,
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 0.8, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
      
      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          border: '2px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997
        }}
        animate={{
          x: targetPosition.x - 25,
          y: targetPosition.y - 25,
          scale: cursorVariant === 'hover' ? 1.5 : cursorVariant === 'click' ? 0.5 : 1,
          rotate: cursorVariant === 'hover' ? 360 : 0
        }}
        transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
      />
      
      {/* Morphing Shapes */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: 'linear-gradient(45deg, #f093fb, #f5576c)',
          pointerEvents: 'none',
          zIndex: 99996
        }}
        animate={{
          x: targetPosition.x - 4,
          y: targetPosition.y - 4,
          borderRadius: cursorVariant === 'hover' ? '0%' : '50%',
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          x: { type: 'tween', duration: 0.08, ease: 'linear' },
          y: { type: 'tween', duration: 0.08, ease: 'linear' },
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
        }}
      />
      
      {/* Pulse Effect */}
      {cursorVariant === 'click' && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '80px',
            height: '80px',
            border: '2px solid rgba(102, 126, 234, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99995
          }}
          initial={{
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: 2,
            opacity: 0
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </>
  );
};

export default CustomCursor;