import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleResumeDownload = () => {
    const resumeUrl = '/Tanishq-Bagde-CV.pdf.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Tanishq-Bagde-CV.pdf';
    link.click();
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      padding: window.innerWidth <= 480 ? '40px 0 30px' : '60px 0 40px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      position: 'relative'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: window.innerWidth <= 768 ? '20px' : '0'
          }}
        >
          <div style={{
            textAlign: window.innerWidth <= 768 ? 'center' : 'left'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: window.innerWidth <= 480 ? '14px' : '16px',
              margin: 0,
              fontWeight: '400'
            }}>
              © 2025 All rights reserved to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '600'
              }}>
                Tanishq Bagde
              </span>
            </p>
          </div>
          
          <motion.button
            onClick={handleResumeDownload}
            className="btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: 'white',
              padding: window.innerWidth <= 480 ? '12px 24px' : '15px 30px',
              borderRadius: '25px',
              fontSize: window.innerWidth <= 480 ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
          >
            📄 Download Resume
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;