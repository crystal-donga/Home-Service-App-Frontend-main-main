import axios from 'axios';
// Utility function to get a cookie by name
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
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
        const token = getCookie('authToken');
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
        if (error.response && error.response.status === 401) {
            // Redirect to login on 401
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
            // Optional: Clear cookie on logout if server doesn't handle it
            document.cookie = 'authToken=; Max-Age=0; path=/;';
        });
    },
    getCurrentUser: () => {
        return api.get('/auth/me');
    },
};

export { api, authService };