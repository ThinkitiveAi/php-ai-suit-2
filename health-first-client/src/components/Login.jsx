import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LocationOn,
  Phone,
  Fax,
  Email
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email field is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: yup.boolean(),
  loginByProvider: yup.boolean(),
  loginAsPatient: yup.boolean()
}).required();

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange' // Changed back to onChange for real-time validation
  });

  // Watch the loginAsPatient checkbox
  const loginAsPatient = watch('loginAsPatient');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const result = await apiService.login({
        email: data.email,
        password: data.password,
        loginByProvider: data.loginByProvider || false,
        loginAsPatient: data.loginAsPatient || false
      });
      
      // Store token securely
      sessionStorage.setItem('authToken', result.token);
      
      // Store user type for future use
      sessionStorage.setItem('userType', data.loginAsPatient ? 'patient' : 'provider');
      
      // Navigate to appropriate dashboard based on user type
      if (data.loginAsPatient) {
        navigate('/patient-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle field blur to show validation
  const handleFieldBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      overflow: 'hidden'
    }}>
      <Grid container sx={{ 
        width: '100%', 
        height: '100%',
        flexWrap: 'nowrap'
      }}>
        {/* Left Column - Branding and Contact Info */}
        {/* <Grid
          item
          xs={12}
          md={4}
          sx={{
            backgroundColor: '#2c3e50',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: { xs: 2, sm: 3, md: 4 },
            color: 'white',
            height: '100vh',
            overflow: 'auto'
          }}
        >
          
          <Box>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              MattheVII
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Psychiatric/Mental Health EHR
            </Typography>
          </Box>

          
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: { xs: 2, md: 4 }
            }}
          >
            <Box
              sx={{
                width: { xs: 150, sm: 180, md: 200 },
                height: { xs: 150, sm: 180, md: 200 },
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                🧠
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
            >
              Contact Info
            </Typography>
            {contactInfo.map((info, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ mr: 1, opacity: 0.8 }}>
                  {info.icon}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                  }}
                >
                  {info.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid> */}

        {/* Right Column - Login Form */}
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'white',
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 500,
              p: { xs: 2, sm: 3, md: 4 }
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              Login to your account
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Welcome back! please enter your details.
            </Typography>

            {loginError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {loginError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Login Type Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('loginAsPatient')}
                  />
                }
                label="Login with patient"
                sx={{ 
                  mb: 2,
                  '& .MuiFormControlLabel-label': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              />

              {/* Email Field */}
              <TextField
                {...register('email')}
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="off"
                onBlur={() => handleFieldBlur('email')}
                sx={{ mb: 2 }}
              />

              {/* Password Field */}
              <TextField
                {...register('password')}
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="new-password"
                onBlur={() => handleFieldBlur('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {/* Remember Me and Forgot Password */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                mb: 3,
                gap: { xs: 1, sm: 0 }
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('rememberMe')}
                    />
                  }
                  label="Remember me"
                />
                <Link href="#" variant="body2" color="primary">
                  Forgot Password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: '#16a085',
                  '&:hover': {
                    backgroundColor: '#138d75'
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  loginAsPatient ? 'Login as Patient' : 'Login as Provider'
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login; 