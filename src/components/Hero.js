import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowWidth;
};

const Hero = () => {
  const [particles, setParticles] = useState([]);
  const [sandParticles, setSandParticles] = useState([]);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 8 + Math.random() * 4,
          xOffset: (Math.random() - 0.5) * 200
        });
      }
      setParticles(newParticles);
    };
    createParticles();

    const handleElementHover = (e) => {
      const rect = e.target.getBoundingClientRect();
      const newSand = [];
      for (let i = 0; i < 3; i++) {
        newSand.push({
          id: Date.now() + i + Math.random(),
          x: rect.left + rect.width * Math.random(),
          y: rect.bottom,
          vx: (Math.random() - 0.5) * 1,
          vy: Math.random() * 1 + 2
        });
      }
      setSandParticles(prev => [...prev, ...newSand].slice(-30));
    };

    const elements = document.querySelectorAll('.sand-trigger');
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mousemove', handleElementHover);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mousemove', handleElementHover);
      });
    };
  }, []);

  return (
    <section id="home" className="section" style={{ 
      textAlign: 'center', 
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000',
      minHeight: '100vh'
    }}>

      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      

      
      {/* Sand Particles */}
      {sandParticles.map((sand) => (
        <motion.div
          key={sand.id}
          style={{
            position: 'fixed',
            left: sand.x,
            top: sand.y,
            width: '2px',
            height: '2px',
            background: '#d4af37',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1000
          }}
          animate={{
            x: sand.x + sand.vx * 100,
            y: sand.y + sand.vy * 200,
            opacity: [1, 0]
          }}
          transition={{
            duration: 2,
            ease: 'easeOut'
          }}
          onAnimationComplete={() => {
            setSandParticles(prev => prev.filter(p => p.id !== sand.id));
          }}
        />
      ))}

      {/* Floating Particles */}
      <div className="hero-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              bottom: '-10px'
            }}
            animate={{
              y: [-10, -windowWidth - 100],
              x: [0, particle.xOffset],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          className={windowWidth <= 480 ? 'hero-mobile' : ''}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="sand-trigger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginBottom: '30px',
              padding: '15px 30px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'inline-block',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
              }}
              animate={{ left: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            ✨ Hey, I'm Tanishq Bagde 
          </motion.div>
          
          <motion.h1 
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              marginBottom: '25px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              lineHeight: '1.2',
              color: '#ffffff',
              position: 'relative'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {'Full Stack Developer'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  color: '#f093fb',
                  transition: { duration: 0.2 }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              marginBottom: '40px',
              maxWidth: windowWidth <= 480 ? '35%' : '700px',
              margin: '0 auto 40px',
              lineHeight: '1.8',
              opacity: '0.9',
              fontWeight: '400',
              padding: windowWidth <= 480 ? '0 10px' : '0'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate about creating <span style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600'
            }}>dynamic web applications</span> using the MERN stack. 
            Turning innovative ideas into digital reality with clean, efficient code.
          </motion.div>
          
          <motion.div
            className={windowWidth <= 480 ? 'hero-buttons' : ''}
            style={{ 
              display: 'flex', 
              gap: windowWidth <= 480 ? '15px' : '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              flexDirection: windowWidth <= 480 ? 'column' : 'row',
              alignItems: 'center'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a 
              href="#projects" 
              className="btn hero-btn sand-trigger" 
              style={{
                minWidth: windowWidth <= 480 ? '200px' : 'auto',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.6 }}
              />
              🚀 View My Work
            </motion.a>
            <motion.button 
              onClick={() => {
                const resumeUrl = '/Tanishq-Bagde-CV.pdf.pdf';
                if (windowWidth <= 768) {
                  window.open(resumeUrl, '_blank');
                } else {
                  const link = document.createElement('a');
                  link.href = resumeUrl;
                  link.download = 'Tanishq_Bagde_Resume.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
              className="btn btn-secondary hero-btn sand-trigger" 
              style={{
                minWidth: windowWidth <= 480 ? '200px' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.6 }}
              />
              📄 Download CV
            </motion.button>
            <motion.a 
              href="#contact" 
              className="btn btn-secondary hero-btn sand-trigger" 
              style={{
                minWidth: windowWidth <= 480 ? '200px' : 'auto',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.6 }}
              />
              💬 Get In Touch
            </motion.a>
          </motion.div>
          
          <motion.div
            style={{
              marginTop: windowWidth <= 480 ? '40px' : '60px',
              width: '100%',
              overflow: 'visible',
              position: 'relative',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              style={{
                display: 'flex',
                gap: '30px',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
              animate={{
                x: [0, -1000]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {[
                'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 
                'Python', 'HTML5', 'CSS', 'Git', 'Docker', 'AWS', , 'MySQL' 
              ].concat([
                'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 
                'Python', 'HTML5', 'CSS', 'Git', 'Docker', 'AWS', 'MySQL'
              ]).map((skill, index) => (
                <motion.div
                  key={index}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '25px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#ffffff',
                    textAlign: 'center',
                    minWidth: 'fit-content',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 10
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    backgroundColor: '#667eea',
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                    zIndex: 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;