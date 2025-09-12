import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Get admin token from environment or prompt user
const getAuthHeaders = () => {
  const token = process.env.REACT_APP_ADMIN_TOKEN || 'admin-token-123';
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const projectsAPI = {
  getAll: () => axios.get(`${API_URL}/api/projects`),
  create: (data) => axios.post(`${API_URL}/api/projects`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API_URL}/api/projects/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API_URL}/api/projects/${id}`, { headers: getAuthHeaders() })
};


export const contactAPI = {
  submit: (data) => axios.post(`${API_URL}/api/contact`, data),
  getAll: () => axios.get(`${API_URL}/api/contact`, { headers: getAuthHeaders() })
};

