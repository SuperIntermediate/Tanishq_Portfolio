import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeader = ({ subtitle, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ textAlign: 'center', marginBottom: '80px' }}
    >
      <motion.div 
        style={{
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '20px',
          position: 'relative',
          display: 'inline-block'
        }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <span style={{
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8))',
        }} />
        {subtitle}
        <span style={{
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
        }} />
      </motion.div>
      
      <motion.h2 
        style={{ 
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          lineHeight: '1.2',
          position: 'relative'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {title.split(' ').map((word, index) => (
          <motion.span
            key={index}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              color: '#f093fb',
              transition: { duration: 0.2 }
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      
      <motion.p 
        style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedHeader;