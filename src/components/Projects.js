import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../services/api';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import AnimatedHeader from './AnimatedHeader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [elementRef, , hasIntersected] = useIntersectionObserver();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const natureImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop'
  ];

  const filteredProjects = useMemo(() => {
    return filter === 'all' ? projects : projects.filter(p => p.category === filter);
  }, [projects, filter]);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(projects.map(p => p.category))];
    return cats;
  }, [projects]);

  useEffect(() => {
    fetchProjects();
    const randomImage = natureImages[Math.floor(Math.random() * natureImages.length)];
    setBackgroundImage(randomImage);
    
    // Listen for new projects added from admin panel
    const handleProjectAdded = () => {
      fetchProjects();
    };
    
    window.addEventListener('projectAdded', handleProjectAdded);
    return () => window.removeEventListener('projectAdded', handleProjectAdded);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProjectClick = () => {
    const randomImage = natureImages[Math.floor(Math.random() * natureImages.length)];
    setBackgroundImage(randomImage);
  };



  const convertImageUrl = (url) => {
    if (!url) return null;
    
    // Google Drive - try direct access
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId[1]}`;
      }
    }
    
    return url;
  };

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };



  return (
    <section id="projects" className="section" style={{ 
      background: backgroundImage ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})` : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      transition: 'background 0.8s ease-in-out'
    }}>
      <div className="container">
        <AnimatedHeader 
          subtitle="Portfolio"
          title="Featured Projects"
          description="Showcasing innovative solutions and technical expertise through real-world applications"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: windowWidth <= 480 ? '10px' : '15px',
            marginBottom: windowWidth <= 480 ? '30px' : '50px',
            flexWrap: 'wrap',
            padding: windowWidth <= 480 ? '0 10px' : '0'
          }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                padding: windowWidth <= 480 ? '8px 16px' : '10px 20px',
                borderRadius: '25px',
                border: 'none',
                background: filter === category 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
                fontSize: windowWidth <= 480 ? '12px' : '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                touchAction: 'manipulation'
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <div className="grid" ref={elementRef}>
          {hasIntersected && filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={handleProjectClick}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: project.featured 
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                border: project.featured ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              {project.featured && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Featured
                </div>
              )}
              
              <div style={{
                height: windowWidth <= 480 ? '180px' : windowWidth <= 768 ? '200px' : '220px',
                borderRadius: windowWidth <= 480 ? '12px' : '15px',
                marginBottom: windowWidth <= 480 ? '20px' : '25px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0'
              }}>
                <img 
                  src={project.imageUrl ? convertImageUrl(project.imageUrl) : `https://via.placeholder.com/600x400/667eea/ffffff?text=${encodeURIComponent(project.title)}`}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    e.target.src = `https://via.placeholder.com/600x400/667eea/ffffff?text=${encodeURIComponent(project.title)}`;
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <div style={{
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>View Details</div>
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {project.category}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#333',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {project.duration}
                </div>
              </div>
              
              <h3 style={{ 
                marginBottom: windowWidth <= 480 ? '12px' : '15px', 
                fontSize: windowWidth <= 480 ? '1.2rem' : windowWidth <= 768 ? '1.3rem' : '1.5rem',
                fontWeight: '700',
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2'
              }}>
                {project.title}
              </h3>
              
              <p style={{ 
                marginBottom: windowWidth <= 480 ? '15px' : '20px',
                color: '#666',
                lineHeight: '1.6',
                fontSize: windowWidth <= 480 ? '13px' : windowWidth <= 768 ? '14px' : '15px'
              }}>
                {project.description}
              </p>
              
              {project.keyFeatures && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Key Features
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.keyFeatures.map((feature, i) => (
                      <span key={i} style={{
                        background: '#f8f9fa',
                        color: '#495057',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        border: '1px solid #e9ecef'
                      }}>
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.impact && (
                <div style={{
                  background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  border: '1px solid #d4edda'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#155724',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    📈 Impact & Results
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#155724',
                    fontWeight: '500'
                  }}>
                    {project.impact}
                  </div>
                </div>
              )}
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '12px 0',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: '#ccc',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '3px'
                  }}>
                    Role
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff'
                  }}>
                    {project.role}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#ccc',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '3px'
                  }}>
                    Duration
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#ffffff'
                  }}>
                    {project.duration}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                {project.technologies?.map((tech, i) => (
                  <span key={i} style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '25px',
                    fontSize: '12px',
                    fontWeight: '500',
                    margin: '0 8px 8px 0',
                    display: 'inline-block',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: windowWidth <= 480 ? '10px' : '15px', 
                flexWrap: 'wrap',
                flexDirection: windowWidth <= 480 ? 'column' : 'row'
              }}>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    className="btn"
                    style={{ 
                      fontSize: windowWidth <= 480 ? '12px' : '14px',
                      padding: windowWidth <= 480 ? '10px 20px' : '12px 25px',
                      background: 'transparent',
                      border: '2px solid #667eea',
                      color: '#667eea',
                      boxShadow: 'none',
                      width: windowWidth <= 480 ? '100%' : 'auto',
                      textAlign: 'center'
                    }}
                  >
                    🐈 GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    className="btn"
                    style={{ 
                      fontSize: windowWidth <= 480 ? '12px' : '14px', 
                      padding: windowWidth <= 480 ? '10px 20px' : '12px 25px',
                      width: windowWidth <= 480 ? '100%' : 'auto',
                      textAlign: 'center'
                    }}
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;