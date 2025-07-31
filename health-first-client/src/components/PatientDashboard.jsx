import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { apiService } from '../services/api';
import PatientRegistrationDialog from './PatientRegistrationDialog';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const patientsData = await apiService.getPatients();
        setPatients(patientsData);
        
        // Get patient name from session storage or use default
        const userType = sessionStorage.getItem('userType');
        if (userType === 'patient') {
          const email = sessionStorage.getItem('userEmail') || 'Patient';
          setPatientName(email.split('@')[0]);
        }
      } catch {
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API fails
      sessionStorage.clear();
      navigate('/');
    }
  };

  const handleRegistrationSuccess = (newPatient) => {
    // Add the new patient to the list
    setPatients(prev => [newPatient, ...prev]);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Header with Welcome and Logout */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome, {patientName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your patient records and information.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ 
            borderColor: '#16a085',
            color: '#16a085',
            '&:hover': {
              borderColor: '#138d75',
              backgroundColor: 'rgba(22, 160, 133, 0.04)'
            }
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Patients List */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Patients ({patients.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setRegistrationOpen(true)}
            sx={{
              backgroundColor: '#16a085',
              '&:hover': {
                backgroundColor: '#138d75'
              }
            }}
          >
            Add New Patient
          </Button>
        </Box>

        {/* Patients Table */}
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Login</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>{patient.user_id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#16a085' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 'medium' }}>
                          {patient.first_name} {patient.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {patient.gender}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{patient.role}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{patient.phone_number}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {patient.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{patient.last_login}</TableCell>
                  <TableCell>
                    <Chip 
                      label={patient.status}
                      size="small"
                      color={patient.status === 'Active' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ 
                        borderColor: '#16a085',
                        color: '#16a085',
                        '&:hover': {
                          borderColor: '#138d75',
                          backgroundColor: 'rgba(22, 160, 133, 0.04)'
                        }
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Patient Registration Dialog */}
      <PatientRegistrationDialog
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </Box>
  );
};

export default PatientDashboard; 