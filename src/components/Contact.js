import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../services/api';
import AnimatedHeader from './AnimatedHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Try API first
      await contactAPI.submit(formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      // If API fails, store message locally
      const messageData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      existingMessages.push(messageData);
      localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
      
      setStatus('Message saved locally! Backend not available, but your message is stored.');
      setFormData({ name: '', email: '', message: '' });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'tanishqthisside860@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Nagpur, MH',
      description: 'Open to remote opportunities'
    }
  ];

  return (
    <section id="contact" className="section" style={{ 
      background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div className="container">
        <AnimatedHeader 
          subtitle="Let's Connect"
          title="Get In Touch"
          description="Ready to bring your ideas to life? Let's discuss your next project"
        />
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '50px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '30px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="card contact-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '30px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#ffffff',
                  textAlign: 'center',
                  minWidth: '280px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                }}
              >
                <motion.div 
                  style={{
                    fontSize: '3rem',
                    marginBottom: '20px',
                    position: 'relative',
                    display: 'inline-block'
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {info.icon}
                </motion.div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: '#ffffff'
                }}>
                  {info.title}
                </h3>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#667eea',
                  marginBottom: '8px'
                }}>
                  {info.value}
                </div>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0
                }}>
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="card contact-form-card"
            style={{ 
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff'
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
          }}
        >
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '15px',
              color: '#ffffff'
            }}>
              Send Me a Message
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px'
            }}>
              I'll get back to you within 24 hours
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px',
              marginBottom: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name here..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '18px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    background: '#fafafa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#f0f0f0';
                    e.target.style.background = '#fafafa';
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Email Address *
                </label>
                <input
                color='white'
                  type="email"
                  name="email"
                  placeholder="HeyEmail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '18px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    background: '#fafafa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#f0f0f0';
                    e.target.style.background = '#fafafa';
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px'
              }}>
                Message *
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '18px',
                  border: '2px solid #f0f0f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '120px',
                  transition: 'all 0.3s ease',
                  background: '#fafafa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.background = '#fff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f0f0f0';
                  e.target.style.background = '#fafafa';
                }}
              />
            </div>
            
            <motion.button 
              type="submit" 
              className="btn contact-submit-btn" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                width: '100%', 
                fontSize: '16px',
                padding: '18px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              {isSubmitting ? '🚀 Sending...' : '📨 Send Message'}
            </motion.button>
            
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  marginTop: '20px', 
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: '600',
                  background: status.includes('Error') 
                    ? 'rgba(231, 76, 60, 0.1)' 
                    : 'rgba(39, 174, 96, 0.1)',
                  color: status.includes('Error') ? '#e74c3c' : '#27ae60',
                  border: `1px solid ${status.includes('Error') ? '#e74c3c' : '#27ae60'}33`
                }}
              >
                {status.includes('Error') ? '⚠️' : '✅'} {status}
              </motion.div>
            )}
          </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;