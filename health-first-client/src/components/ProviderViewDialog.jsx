import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  alpha
} from '@mui/material';
import {
  Close,
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Star,
  Security,
  CalendarToday
} from '@mui/icons-material';

const ProviderViewDialog = ({ open, onClose, provider }) => {
  if (!provider) return null;

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
        size="medium"
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
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'white',
              color: '#667eea',
              width: 56,
              height: 56,
              fontSize: '1.5rem',
              fontWeight: 700
            }}
          >
            {getInitials(provider.first_name, provider.last_name)}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
              {provider.first_name} {provider.last_name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Provider ID: {provider.id}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.1)
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Person sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Personal Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Full Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {provider.first_name} {provider.last_name}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Email Address
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {provider.email}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Phone Number
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatPhoneNumber(provider.phone_number)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Professional Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Work sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Professional Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Specialization
                  </Typography>
                  <Chip 
                    label={provider.specialization} 
                    variant="outlined" 
                    icon={<Work sx={{ fontSize: 16 }} />}
                    sx={{ 
                      fontWeight: 600,
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    License Number
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="body1" sx={{ 
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
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Years of Experience
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {provider.years_of_experience} years
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Status
                  </Typography>
                  {getStatusChip(provider.status)}
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationOn sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Address Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {provider.street}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 3, color: 'text.secondary' }}>
                  {provider.city}, {provider.state} {provider.zip}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 600
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderViewDialog; 