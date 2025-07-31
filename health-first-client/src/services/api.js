import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.response?.data);
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      sessionStorage.removeItem('authToken');
      // Redirect to login if needed
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Authentication
  async login(credentials) {
    try {
      // For demo purposes, simulate API call
      // In production, replace with actual API endpoint
      
      // Dummy login credentials for testing
      const validCredentials = [
        { email: 'demo@example.com', password: 'password123' },
        { email: 'admin@matthevii.com', password: 'Admin123!' },
        { email: 'provider@test.com', password: 'Provider123!' },
        { email: 'doctor@health.com', password: 'Doctor123!' },
        { email: 'test@example.com', password: 'Test123!' }
      ];
      
      const isValidCredential = validCredentials.some(
        cred => cred.email === credentials.email && cred.password === credentials.password
      );
      
      if (isValidCredential) {
        // Store user email in sessionStorage
        sessionStorage.setItem('userEmail', credentials.email);
        
        // Simulate successful login
        const mockResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: credentials.loginAsPatient ? 'patient' : 'provider'
          }
        };
        return mockResponse;
      } else {
        // Simulate failed login
        throw new Error('Invalid credentials');
      }
    } catch {
      throw new Error('Invalid email or password. Please try again.');
    }
  },

  async logout() {
    sessionStorage.removeItem('authToken');
    return { success: true };
  },

  // Provider Management
  async getProviders() {
    try {
      // Simulate API call - replace with actual endpoint
      const mockProviders = [
        {
          id: 1,
          first_name: 'Dr. John',
          last_name: 'Smith',
          email: 'john.smith@example.com',
          phone_number: '+1 (555) 123-4567',
          specialization: 'Psychiatry',
          license_number: 'PSY123456',
          years_of_experience: 15,
          street: '123 Medical Center Dr',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34950',
          status: 'active'
        },
        {
          id: 2,
          first_name: 'Dr. Sarah',
          last_name: 'Johnson',
          email: 'sarah.johnson@example.com',
          phone_number: '+1 (555) 234-5678',
          specialization: 'Clinical Psychology',
          license_number: 'PSY789012',
          years_of_experience: 8,
          street: '456 Health Plaza',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34951',
          status: 'active'
        },
        {
          id: 3,
          first_name: 'Dr. Michael',
          last_name: 'Brown',
          email: 'michael.brown@example.com',
          phone_number: '+1 (555) 345-6789',
          specialization: 'Child Psychiatry',
          license_number: 'PSY345678',
          years_of_experience: 12,
          street: '789 Wellness Blvd',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34952',
          status: 'pending'
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockProviders;
    } catch {
      throw new Error('Failed to fetch providers');
    }
  },

  // Patient Management
  async getPatients() {
    try {
      // Simulate API call - replace with actual endpoint
      const mockPatients = [
        {
          id: 1,
          user_id: 'A8431',
          first_name: 'Cameron',
          last_name: 'Williamson',
          email: 'cameron.williamson@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1990-05-15',
          gender: 'Male',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '123 Main St',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34950',
          insurance_provider: 'Blue Cross Blue Shield',
          policy_number: 'BCBS123456',
          emergency_contact_name: 'Sarah Williamson',
          emergency_contact_phone: '(569) 822-4145',
          emergency_contact_relationship: 'Spouse',
          medical_history: ['Hypertension', 'Diabetes Type 2']
        },
        {
          id: 2,
          user_id: 'A8431',
          first_name: 'Ronald',
          last_name: 'Richards',
          email: 'ronald.richards@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1985-08-22',
          gender: 'Male',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '456 Oak Ave',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34951',
          insurance_provider: 'United Healthcare',
          policy_number: 'UHC789012',
          emergency_contact_name: 'Mary Richards',
          emergency_contact_phone: '(569) 822-4146',
          emergency_contact_relationship: 'Wife',
          medical_history: ['Asthma', 'Allergies']
        },
        {
          id: 3,
          user_id: 'A8431',
          first_name: 'Eleanor',
          last_name: 'Pena',
          email: 'eleanor.pena@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1992-03-10',
          gender: 'Female',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '789 Pine Rd',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34952',
          insurance_provider: 'Aetna',
          policy_number: 'AET345678',
          emergency_contact_name: 'John Pena',
          emergency_contact_phone: '(569) 822-4147',
          emergency_contact_relationship: 'Husband',
          medical_history: ['Depression', 'Anxiety']
        },
        {
          id: 4,
          user_id: 'A8431',
          first_name: 'Darrell',
          last_name: 'Steward',
          email: 'darrell.steward@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1988-11-05',
          gender: 'Female',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '321 Elm St',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34953',
          insurance_provider: 'Cigna',
          policy_number: 'CIG901234',
          emergency_contact_name: 'Robert Steward',
          emergency_contact_phone: '(569) 822-4148',
          emergency_contact_relationship: 'Brother',
          medical_history: ['Migraine', 'Insomnia']
        },
        {
          id: 5,
          user_id: 'A8431',
          first_name: 'Guy',
          last_name: 'Hawkins',
          email: 'guy.hawkins@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1995-07-18',
          gender: 'Male',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '654 Maple Dr',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34954',
          insurance_provider: 'Humana',
          policy_number: 'HUM567890',
          emergency_contact_name: 'Lisa Hawkins',
          emergency_contact_phone: '(569) 822-4149',
          emergency_contact_relationship: 'Sister',
          medical_history: ['ADHD', 'Learning Disability']
        },
        {
          id: 6,
          user_id: 'A8431',
          first_name: 'Robert',
          last_name: 'Fox',
          email: 'robert.fox@example.com',
          phone_number: '(569) 822-4144',
          date_of_birth: '1983-12-25',
          gender: 'Male',
          role: 'Patient',
          contact: '(569) 822-4144',
          last_login: 'Mon, 24-06-2023',
          status: 'Active',
          street: '987 Cedar Ln',
          city: 'Fort Pierce',
          state: 'FL',
          zip: '34955',
          insurance_provider: 'Kaiser Permanente',
          policy_number: 'KAI234567',
          emergency_contact_name: 'Jennifer Fox',
          emergency_contact_phone: '(569) 822-4150',
          emergency_contact_relationship: 'Daughter',
          medical_history: ['Bipolar Disorder', 'PTSD']
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPatients;
    } catch {
      throw new Error('Failed to fetch patients');
    }
  },

  async registerPatient(patientData) {
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be a POST request to /api/v1/patients
      const newPatient = {
        id: Date.now(),
        user_id: 'A8431',
        ...patientData,
        status: 'Active',
        last_login: new Date().toLocaleDateString('en-US', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        created_at: new Date().toISOString()
      };
      
      return newPatient;
    } catch {
      throw new Error('Failed to register patient');
    }
  },

  async registerProvider(providerData) {
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be a POST request to /api/v1/providers
      const newProvider = {
        id: Date.now(),
        ...providerData,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      return newProvider;
    } catch {
      throw new Error('Failed to register provider');
    }
  },

  async updateProvider(id, providerData) {
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { id, ...providerData, updated_at: new Date().toISOString() };
    } catch {
      throw new Error('Failed to update provider');
    }
  },

  async deleteProvider(id) {
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, id };
    } catch {
      throw new Error('Failed to delete provider');
    }
  },

  // Posts
  async getPosts(limit = 10) {
    const response = await api.get(`/posts?_limit=${limit}`);
    return response.data;
  },

  async getPost(id) {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(postData) {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  async updatePost(id, postData) {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  async deletePost(id) {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Users
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Comments
  async getComments(postId) {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  // Generic methods
  async get(endpoint, params = {}) {
    const response = await api.get(endpoint, { params });
    return response.data;
  },

  async post(endpoint, data = {}) {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  async put(endpoint, data = {}) {
    const response = await api.put(endpoint, data);
    return response.data;
  },

  async delete(endpoint) {
    const response = await api.delete(endpoint);
    return response.data;
  },
};

export default api; 