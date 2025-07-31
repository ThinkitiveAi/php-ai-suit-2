import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  alpha,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { 
  Logout, 
  PersonAdd, 
  People, 
  Dashboard as DashboardIcon,
  Settings,
  TrendingUp,
  Security,
  Speed,
  CheckCircle
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/');
  };

  const handleNavigateToProviders = () => {
    navigate('/providers');
  };

  const handleNavigateToRegistration = () => {
    navigate('/provider-registration');
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}
            >
              <DashboardIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5
                }}
              >
                MattheVII Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Psychiatric/Mental Health EHR System
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderColor: 'error.main',
              color: 'error.main',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: alpha('#f44336', 0.04)
              }
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Welcome Section */}
        <Card sx={{ 
          p: 4, 
          mb: 4, 
          width: '100%',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CheckCircle sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Welcome to MattheVII
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
            You have successfully logged in to the Psychiatric/Mental Health EHR system. 
            Manage your healthcare providers and streamline your practice operations.
          </Typography>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ 
              height: '100%', 
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 56, 
                      height: 56,
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      mr: 2,
                      boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
                    }}
                  >
                    <People sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      Manage Providers
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      View and manage all registered healthcare providers in your system
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label="3 Total" color="primary" size="small" />
                  <Chip label="2 Active" color="success" size="small" />
                  <Chip label="1 Pending" color="warning" size="small" />
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  startIcon={<People />}
                  onClick={handleNavigateToProviders}
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                    }
                  }}
                >
                  View Providers
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ 
              height: '100%', 
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 56, 
                      height: 56,
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      mr: 2,
                      boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)'
                    }}
                  >
                    <PersonAdd sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      Add New Provider
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      Register a new healthcare provider to expand your practice network
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label="Quick Setup" color="info" size="small" />
                  <Chip label="Secure" color="success" size="small" />
                  <Chip label="Verified" color="primary" size="small" />
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<PersonAdd />}
                  onClick={handleNavigateToRegistration}
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)'
                    }
                  }}
                >
                  Register Provider
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* System Status */}
        <Grid container spacing={3} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ 
              p: 3, 
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                    mr: 2
                  }}
                >
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  System Status
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                All systems are operational and ready for use.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Online" color="success" size="small" />
                <Chip label="Secure" color="info" size="small" />
                <Chip label="Updated" color="primary" size="small" />
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ 
              p: 3, 
              width: '100%',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    background: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
                    mr: 2
                  }}
                >
                  <TrendingUp />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quick Stats
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Overview of your healthcare provider network
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Total: 3" color="primary" size="small" />
                <Chip label="Active: 2" color="success" size="small" />
                <Chip label="Pending: 1" color="warning" size="small" />
                <Chip label="Avg Exp: 12y" color="info" size="small" />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Features */}
        <Grid container spacing={3} sx={{ mt: 2, width: '100%' }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 32px rgba(156, 39, 176, 0.3)'
                }}
              >
                <Security />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Secure Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HIPAA compliant security measures protect patient data
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  background: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 32px rgba(0, 188, 212, 0.3)'
                }}
              >
                <Speed />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Fast Performance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optimized for quick access and smooth user experience
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  background: 'linear-gradient(135deg, #ff5722 0%, #ff9800 100%)',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 32px rgba(255, 87, 34, 0.3)'
                }}
              >
                <Settings />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Easy Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Intuitive interface for efficient practice management
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 