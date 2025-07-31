import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Divider,
  alpha
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Star
} from '@mui/icons-material';
import ProviderRegistrationDialog from './ProviderRegistrationDialog';

const ProvidersList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
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
      setProviders(mockProviders);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load providers',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProvider = (providerData) => {
    const newProvider = {
      id: providers.length + 1,
      ...providerData,
      status: 'pending'
    };
    
    setProviders([...providers, newProvider]);
    setSnackbar({
      open: true,
      message: 'Provider onboarded successfully!',
      severity: 'success'
    });
  };

  const handleDeleteProvider = (id) => {
    setProviders(providers.filter(provider => provider.id !== id));
    setSnackbar({
      open: true,
      message: 'Provider removed successfully',
      severity: 'success'
    });
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { 
        color: 'success', 
        label: 'Active',
        bgColor: alpha('#4caf50', 0.1),
        textColor: '#2e7d32'
      },
      pending: { 
        color: 'warning', 
        label: 'Pending',
        bgColor: alpha('#ff9800', 0.1),
        textColor: '#ed6c02'
      },
      inactive: { 
        color: 'error', 
        label: 'Inactive',
        bgColor: alpha('#f44336', 0.1),
        textColor: '#d32f2f'
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Chip 
        label={config.label} 
        color={config.color} 
        size="small"
        sx={{
          backgroundColor: config.bgColor,
          color: config.textColor,
          fontWeight: 600,
          '& .MuiChip-label': {
            color: config.textColor
          }
        }}
      />
    );
  };

  const formatPhoneNumber = (phone) => {
    // Simple phone formatting - in production, use a proper library
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading providers...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      width: '100%'
    }}>
      <Container 
        maxWidth={false} 
        sx={{ 
          py: 4,
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          width: '100%'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Healthcare Providers
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Manage your registered healthcare providers with ease
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Add Provider
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {providers.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Providers
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {providers.filter(p => p.status === 'active').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Active Providers
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {providers.filter(p => p.status === 'pending').length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Pending Review
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              color: '#2c3e50',
              boxShadow: '0 8px 32px rgba(168, 237, 234, 0.3)'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {Math.round(providers.reduce((acc, p) => acc + p.years_of_experience, 0) / providers.length || 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Avg. Experience
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Providers Table */}
        <Card sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Provider
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Contact
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Specialization
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    License
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Experience
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {providers.map((provider, index) => (
                  <TableRow 
                    key={provider.id} 
                    hover
                    sx={{ 
                      '&:hover': {
                        backgroundColor: alpha('#1976d2', 0.04),
                        transform: 'scale(1.01)',
                        transition: 'all 0.2s ease'
                      },
                      '&:nth-of-type(even)': {
                        backgroundColor: alpha('#f8fafc', 0.5)
                      }
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                            width: 48,
                            height: 48,
                            fontSize: '1.2rem',
                            fontWeight: 600
                          }}
                        >
                          {getInitials(provider.first_name, provider.last_name)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {provider.first_name} {provider.last_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            ID: {provider.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {provider.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatPhoneNumber(provider.phone_number)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip 
                        label={provider.specialization} 
                        variant="outlined" 
                        size="small"
                        icon={<Work sx={{ fontSize: 16 }} />}
                        sx={{ 
                          fontWeight: 600,
                          borderColor: 'primary.main',
                          color: 'primary.main'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        color: '#374151',
                        backgroundColor: alpha('#e5e7eb', 0.5),
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        {provider.license_number}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {provider.years_of_experience} years
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ maxWidth: 200 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                            {provider.street}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {provider.city}, {provider.state} {provider.zip}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      {getStatusChip(provider.status)}
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            color="primary"
                            sx={{ 
                              backgroundColor: alpha('#1976d2', 0.1),
                              '&:hover': {
                                backgroundColor: alpha('#1976d2', 0.2)
                              }
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Provider">
                          <IconButton 
                            size="small" 
                            color="primary"
                            sx={{ 
                              backgroundColor: alpha('#1976d2', 0.1),
                              '&:hover': {
                                backgroundColor: alpha('#1976d2', 0.2)
                              }
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Provider">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteProvider(provider.id)}
                            sx={{ 
                              backgroundColor: alpha('#d32f2f', 0.1),
                              '&:hover': {
                                backgroundColor: alpha('#d32f2f', 0.2)
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Empty State */}
        {providers.length === 0 && (
          <Card sx={{ 
            textAlign: 'center', 
            py: 8,
            px: 4,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <Person sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
              No providers found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
              Get started by adding your first healthcare provider to the system
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Add First Provider
            </Button>
          </Card>
        )}

        {/* Registration Dialog */}
        <ProviderRegistrationDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSuccess={handleAddProvider}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProvidersList; 