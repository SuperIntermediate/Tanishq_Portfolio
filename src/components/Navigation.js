import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  // Hide navigation on mobile
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={isMobile ? 'nav-mobile' : ''}
      style={{
        position: 'fixed',
        right: isMobile ? '15px' : '30px',
        top: isMobile ? '20px' : '50%',
        transform: isMobile ? 'none' : 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        gap: isMobile ? '10px' : '15px',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}
    >
      {[
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'projects', icon: '💼', label: 'Projects' },
        { id: 'skills', icon: '🛠️', label: 'Skills' },
        { id: 'contact', icon: '📧', label: 'Contact' }
      ].map((item) => (
        <div
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          style={{
            width: isMobile ? '40px' : '50px',
            height: isMobile ? '40px' : '50px',
            borderRadius: '50%',
            background: activeSection === item.id 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = 'scale(1)';
            }
          }}
          onTouchStart={(e) => {
            e.target.style.transform = 'scale(0.95)';
          }}
          onTouchEnd={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span style={{ fontSize: isMobile ? '16px' : '20px' }}>{item.icon}</span>
          {!isMobile && (
            <div style={{
              position: 'absolute',
              right: '60px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              whiteSpace: 'nowrap',
              pointerEvents: 'none'
            }}
            className="tooltip">
              {item.label}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default Navigation;