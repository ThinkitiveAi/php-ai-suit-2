import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box
} from '@mui/material';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientDashboard from './components/PatientDashboard';
import ProvidersList from './components/ProvidersList';
import ProviderRegistrationDialog from './components/ProviderRegistrationDialog';
import PatientRegistrationDialog from './components/PatientRegistrationDialog';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#16a085',
    },
    secondary: {
      main: '#2c3e50',
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('authToken');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/providers" 
              element={
                <ProtectedRoute>
                  <ProvidersList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/provider-registration" 
              element={
                <ProtectedRoute>
                  <ProviderRegistrationDialog 
                    open={true} 
                    onClose={() => window.history.back()}
                    onSuccess={(data) => {
                      console.log('Provider registered:', data);
                      window.history.back();
                    }}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient-registration" 
              element={
                <ProtectedRoute>
                  <PatientRegistrationDialog 
                    open={true} 
                    onClose={() => window.history.back()}
                    onSuccess={(data) => {
                      console.log('Patient registered:', data);
                      window.history.back();
                    }}
                  />
                </ProtectedRoute>
              } 
            />
            {/* Redirect any unknown routes to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
