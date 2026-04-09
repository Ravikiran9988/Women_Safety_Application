import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.122:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

console.info('🧭 Admin API base URL:', API_BASE_URL);

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await apiClient.post('/api/admin/login', { email, password });
    if (response.data.ok && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },
};

// SOS API
export const sosAPI = {
  getActiveSOS: async () => {
    const response = await apiClient.get('/api/active-sos');
    return response.data;
  },

  getTracking: async (sosId) => {
    const response = await apiClient.get(`/api/tracking/${sosId}`);
    return response.data;
  },

  getHistory: async () => {
    try {
      const response = await apiClient.get('/api/sos/history');
      return response.data;
    } catch (error) {
      // Backward-compatible fallback for older servers that do not expose history
      if (error?.response?.status === 404) {
        const fallback = await apiClient.get('/api/active-sos');
        const rows = (fallback.data?.data || []).filter((s) => s.status === 'resolved');
        return {
          ok: true,
          data: rows,
          count: rows.length,
          fallback: true,
        };
      }
      throw error;
    }
  },

  resolveSOS: async (sosId) => {
    const response = await apiClient.put(`/api/sos/${sosId}/resolve`);
    return response.data;
  },

  assignSOS: async (sosId, responderType, responderDetails = {}) => {
    const response = await apiClient.put(`/api/sos/${sosId}/assign`, {
      responderType,
      ...responderDetails,
    });
    return response.data;
  },
};

export default apiClient;
