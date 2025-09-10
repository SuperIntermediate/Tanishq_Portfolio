import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI, contactAPI } from '../services/api';

const AdminPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    category: '',
    keyFeatures: '',
    impact: '',
    duration: '',
    role: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    if (editingProject && !isAuthenticated) {
      const enteredPassword = prompt('Enter admin password to update:');
      if (enteredPassword !== 'T@nishq860') {
        alert('Incorrect password!');
        return;
      }
      setIsAuthenticated(true);
    }
    
    try {
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t),
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
        imageUrl: projectForm.imageUrl || `https://via.placeholder.com/600x400/667eea/ffffff?text=${encodeURIComponent(projectForm.title)}`,
        category: projectForm.category,
        role: projectForm.role,
        duration: projectForm.duration,
        impact: projectForm.impact,
        keyFeatures: projectForm.keyFeatures.split(',').map(f => f.trim()).filter(f => f),
        featured: false
      };
      
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData);
        alert('Project updated successfully!');
        setEditingProject(null);
      } else {
        await projectsAPI.create(projectData);
        alert('Project added successfully to database!');
      }
      
      setProjectForm({
        title: '', description: '', detailedDescription: '', technologies: '',
        githubUrl: '', liveUrl: '', imageUrl: '', category: '', keyFeatures: '', impact: '', duration: '', role: ''
      });
      
      fetchProjects();
      window.dispatchEvent(new CustomEvent('projectAdded'));
      
    } catch (error) {
      console.error('Error saving project:', error);
      let errorMessage = 'Error saving project to database.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage += ` Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage += ' Cannot connect to server. Make sure the backend is running on http://localhost:5002';
      } else {
        // Something else happened
        errorMessage += ` ${error.message}`;
      }
      
      alert(errorMessage);
    }
  };

  const handleEditProject = (project) => {
    if (!isAuthenticated) {
      const enteredPassword = prompt('Enter admin password to edit:');
      if (enteredPassword !== 'T@nishq860') {
        alert('Incorrect password!');
        return;
      }
      setIsAuthenticated(true);
    }
    
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      detailedDescription: '',
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || '',
      category: project.category || '',
      keyFeatures: project.keyFeatures ? project.keyFeatures.join(', ') : '',
      impact: project.impact || '',
      duration: project.duration || '',
      role: project.role || ''
    });
  };

  const handleDeleteProject = async (projectId) => {
    if (!isAuthenticated) {
      const enteredPassword = prompt('Enter admin password to delete:');
      if (enteredPassword !== 'T@nishq860') {
        alert('Incorrect password!');
        return;
      }
      setIsAuthenticated(true);
    }
    
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(projectId);
        alert('Project deleted successfully!');
        fetchProjects();
        window.dispatchEvent(new CustomEvent('projectAdded'));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setProjectForm({
      title: '', description: '', detailedDescription: '', technologies: '',
      githubUrl: '', liveUrl: '', imageUrl: '', category: '', keyFeatures: '', impact: '', duration: '', role: ''
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchProjects();
      fetchMessages();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="admin-panel-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
        cursor: 'default'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="card admin-panel-content"
        style={{
          width: '100%',
          maxWidth: window.innerWidth <= 768 ? '95vw' : '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          margin: 'auto',
          zIndex: 10000,
          padding: window.innerWidth <= 480 ? '15px' : '40px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        <h2 style={{ marginBottom: '30px', color: '#333' }}>Portfolio Admin Panel</h2>

        <div style={{ 
          display: 'flex', 
          gap: window.innerWidth <= 480 ? '10px' : '20px', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: window.innerWidth <= 480 ? 'center' : 'flex-start'
        }}>
          {['projects', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn"
              style={{
                background: activeTab === tab ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                border: '2px solid #667eea',
                color: activeTab === tab ? 'white' : '#667eea',
                fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                padding: window.innerWidth <= 480 ? '8px 16px' : '15px 35px'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'projects' && (
          <div>
            <form onSubmit={handleProjectSubmit}>
              <h3 style={{ marginBottom: '20px' }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              
              {editingProject && (
                <div style={{ marginBottom: '20px', padding: '10px', background: '#e3f2fd', borderRadius: '8px' }}>
                  <span>Editing: {editingProject.title}</span>
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: window.innerWidth <= 480 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: window.innerWidth <= 480 ? '15px' : '20px' 
            }}>
              <input
                type="text"
                placeholder="Project Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                required
                style={{ 
                  padding: window.innerWidth <= 480 ? '10px' : '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontSize: window.innerWidth <= 480 ? '14px' : '16px'
                }}
              />
              <input
                type="text"
                placeholder="Category"
                value={projectForm.category}
                onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                style={{ 
                  padding: window.innerWidth <= 480 ? '10px' : '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontSize: window.innerWidth <= 480 ? '14px' : '16px'
                }}
              />
            </div>

            <textarea
              placeholder="Short Description"
              value={projectForm.description}
              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              required
              rows="3"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px 0' }}
            />

            <textarea
              placeholder="Detailed Description"
              value={projectForm.detailedDescription}
              onChange={(e) => setProjectForm({...projectForm, detailedDescription: e.target.value})}
              rows="4"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <input
                type="text"
                placeholder="Key Features (comma separated)"
                value={projectForm.keyFeatures}
                onChange={(e) => setProjectForm({...projectForm, keyFeatures: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
            </div>

            <input
              type="url"
              placeholder="Project Image URL (e.g., https://example.com/image.jpg)"
              value={projectForm.imageUrl}
              onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' }}
            />
            
            {projectForm.imageUrl && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Image Preview:</p>
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: `url(${projectForm.imageUrl}) center/cover`,
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <input
                type="url"
                placeholder="GitHub URL"
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <input
                type="url"
                placeholder="Live Demo URL"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Duration (e.g., 3 months)"
                value={projectForm.duration}
                onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <input
                type="text"
                placeholder="Your Role"
                value={projectForm.role}
                onChange={(e) => setProjectForm({...projectForm, role: e.target.value})}
                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
            </div>

            <textarea
              placeholder="Impact & Results"
              value={projectForm.impact}
              onChange={(e) => setProjectForm({...projectForm, impact: e.target.value})}
              rows="2"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}
            />



              <button type="submit" className="btn" style={{ width: '100%' }}>
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
            </form>
            
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ marginBottom: '20px' }}>Existing Projects</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {projects.map(project => (
                  <div key={project._id} style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{project.title}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                        {project.description.substring(0, 100)}...
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleEditProject(project)}
                        style={{
                          padding: '5px 10px',
                          fontSize: '12px',
                          background: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        style={{
                          padding: '5px 10px',
                          fontSize: '12px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Contact Messages</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {messages.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                  No messages yet.
                </p>
              ) : (
                messages.map(message => (
                  <div key={message._id} style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    background: '#f9f9f9'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, color: '#333' }}>{message.name}</h4>
                      <small style={{ color: '#666' }}>
                        {new Date(message.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      <strong>Email:</strong> {message.email}
                    </p>
                    <p style={{ margin: '10px 0 0 0', color: '#333', lineHeight: '1.5' }}>
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}


      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;