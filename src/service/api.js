import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 (Unauthorized) responses
        if (error.response && error.response.status === 401) {
            // Clear auth data and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth services
const authService = {
    login: (credentials) => {
        return api.post('/auth/login', credentials);
    },
    register: (userData) => {
        return api.post('/auth/register', userData);
    },
    logout: () => {
        return api.post('/auth/logout').then(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        });
    },
    getCurrentUser: () => {
        return api.get('/auth/me');
    },
};

// Export services
export { api, authService };