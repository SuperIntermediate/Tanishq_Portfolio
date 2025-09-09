import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeader from './AnimatedHeader';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);



  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      description: 'Creating engaging user interfaces with modern frameworks',
      skills: [
        { name: 'React', level: 90, color: '#61DAFB', experience: '6 months' },
        { name: 'JavaScript', level: 70, color: '#F7DF1E', experience: '6 months' },
        // { name: 'TypeScript', level: 85, color: '#3178C6', experience: '2+ years', projects: 10 },
        { name: 'HTML/CSS', level: 90, color: '#E34F26', experience: '1 year' },
        { name: 'Next.js', level: 70, color: '#000000', experience: '3 months' },
        // { name: 'Tailwind CSS', level: 85, color: '#06B6D4', experience: '2+ years', projects: 12 }
      ]
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      description: 'Building robust server-side applications and APIs',
      skills: [
        { name: 'Node.js', level: 85, color: '#339933', experience: '3 months' },
        { name: 'Express.js', level: 85, color: '#000000', experience: '3 months' },
        { name: 'Python', level: 80, color: '#3776AB', experience: '6 months' },
        { name: 'REST APIs', level: 88, color: '#FF6B35', experience: '3 months' },
        { name: 'MsSQL', level: 75, color: '#E10098', experience: '6 months' },
        // { name: 'Microservices', level: 70, color: '#FF9500', experience: '1+ years' }
      ]
    },
    {
      title: 'Database & Cloud',
      icon: '📊',
      description: 'Managing data and deploying scalable applications',
      skills: [
        { name: 'MongoDB', level: 80, color: '#47A248', experience: '3 months' },
        // { name: 'PostgreSQL', level: 75, color: '#336791', experience: '2+ years', projects: 8 },
        { name: 'AWS', level: 70, color: '#FF9900', experience: '6 months' },
        { name: 'Docker', level: 70, color: '#2496ED', experience: '3 months' },
        // { name: 'Redis', level: 65, color: '#DC382D', experience: '1+ years', projects: 5 },
        // { name: 'Firebase', level: 75, color: '#FFCA28', experience: '2+ years', projects: 8 }
      ]
    },
    {
      title: 'Tools & Workflow',
      icon: '🔧',
      description: 'Development tools and project management expertise',
      skills: [
        { name: 'Git', level: 90, color: '#F05032', experience: '6 months' },
        { name: 'VS Code', level: 95, color: '#007ACC', experience: '1 year' },
        // { name: 'Webpack', level: 75, color: '#8DD6F9', experience: '2+ years', projects: 12 },
        // { name: 'Jest', level: 80, color: '#C21325', experience: '2+ years', projects: 15 },
        // { name: 'Figma', level: 70, color: '#F24E1E', experience: '2+ years', projects: 20 },
        // { name: 'Agile/Scrum', level: 85, color: '#0052CC', experience: '3+ years', projects: 25 }
      ]
    }
  ];

  const certifications = [
    { name: 'MsSQL', issuer: 'Intellipaat', year: '2025' },
    { name: 'DevOps Course Certificate', issuer: 'Intellipaat', year: '2025' },
    // { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', year: '2022' }
  ];



  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <AnimatedHeader 
          subtitle="Expertise"
          title="Technical Skills"
          description="Proficient in modern technologies and frameworks for full-stack development"
        />
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '800px',
          margin: '0 auto 60px'
        }}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-bar"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: activeCategory === categoryIndex 
                  ? 'rgba(255, 255, 255, 0.98)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActiveCategory(activeCategory === categoryIndex ? null : categoryIndex)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 30px',
                minHeight: '80px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginRight: '20px'
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      fontFamily: 'Poppins, sans-serif',
                      color: activeCategory === categoryIndex ? '#667eea' : 'white',
                      marginBottom: '5px',
                      transition: 'color 0.3s ease'
                    }}>
                      {category.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: activeCategory === categoryIndex ? '#666' : 'rgba(255,255,255,0.7)',
                      margin: 0,
                      transition: 'color 0.3s ease'
                    }}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: activeCategory === categoryIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: '1.5rem',
                    color: activeCategory === categoryIndex ? '#667eea' : 'white'
                  }}
                >
                  ▼
                </motion.div>
              </div>
              
              <AnimatePresence>
                {activeCategory === categoryIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      padding: '0 30px 30px',
                      borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        style={{ marginBottom: '25px' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '12px' 
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <div style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: skill.color,
                              marginRight: '10px'
                            }}></div>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                fontWeight: '600',
                                fontSize: '15px',
                                color: '#333',
                                marginBottom: '2px'
                              }}>
                                {skill.name}
                              </div>
                              <div style={{
                                fontSize: '11px',
                                color: '#666'
                              }}>
                                {skill.experience}
                              </div>
                            </div>
                          </div>
                          <span style={{
                            fontWeight: '700',
                            fontSize: '14px',
                            color: skill.color,
                            background: `${skill.color}15`,
                            padding: '4px 10px',
                            borderRadius: '15px'
                          }}>
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div style={{ 
                          background: '#f8f9fa', 
                          borderRadius: '15px', 
                          height: '8px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                              height: '100%',
                              borderRadius: '15px'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
          style={{
            maxWidth: '800px',
            margin: '0 auto 60px'
          }}
        >
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            marginBottom: '25px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🏆 Certifications
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  borderRadius: '15px',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontWeight: '600',
                  fontSize: '16px',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  {cert.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{cert.issuer}</span>
                  <span style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="card"
          style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#333'
          }}>
            🚀 Always Learning & Growing
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.7',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Continuously expanding my skill set with emerging technologies and best practices. 
            Currently exploring AI/ML integration, cloud architecture, and advanced React patterns.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;