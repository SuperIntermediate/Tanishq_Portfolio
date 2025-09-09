import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ showAdmin, setShowAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Mobile check:', mobile, 'Width:', window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      background: scrolled ? 'rgba(255,255,255,0.1)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      border: scrolled ? '1px solid rgba(255,255,255,0.2)' : 'none',
      zIndex: 1000,
      padding: scrolled ? '12px 0' : '20px 0',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: window.innerWidth <= 768 ? 'flex-start' : 'space-between', 
        alignItems: 'center',
        gap: window.innerWidth <= 768 ? '15px' : '0'
      }}>
        <div style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          fontFamily: 'Poppins, sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Portfolio
        </div>
        {window.innerWidth <= 768 ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: '#667eea',
                border: '2px solid #ffffff',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '22px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease',
                zIndex: 1002,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#764ba2';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '15px',
                    minWidth: '150px',
                    zIndex: 1001
                  }}
                >
                  {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        padding: '12px 15px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        marginBottom: '5px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                      }}
                    >
                      {item}
                    </button>
                  ))}
                  <hr style={{ 
                    border: 'none', 
                    borderTop: '1px solid rgba(255,255,255,0.2)', 
                    margin: '10px 0' 
                  }} />
                  <button
                    onClick={() => {
                      setShowAdmin(true);
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      padding: '12px 15px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    ⚙️ Admin
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <nav style={{ 
            display: 'flex', 
            gap: '30px',
            alignItems: 'center'
          }}>
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  textDecoration: 'none', 
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '15px',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setShowAdmin(true)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer',
                marginLeft: '20px'
              }}
            >
              ⚙️ Admin
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;