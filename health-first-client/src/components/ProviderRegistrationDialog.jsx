import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Chip,
  Divider,
  Card,
  CardContent,
  alpha,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Close,
  CheckCircle,
  Cancel,
  Person,
  Security,
  Work,
  LocationOn,
  ArrowForward,
  ArrowBack,
  Edit
} from '@mui/icons-material';

// Validation schema for registration (with password)
const registrationSchema = yup.object({
  // Personal Information
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .trim(),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .trim(),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .trim(),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  
  // Professional Information
  specialization: yup
    .string()
    .required('Specialization is required')
    .min(3, 'Specialization must be at least 3 characters')
    .max(100, 'Specialization must be less than 100 characters')
    .trim(),
  license_number: yup
    .string()
    .required('License number is required')
    .matches(/^[A-Za-z0-9]+$/, 'License number must be alphanumeric')
    .trim(),
  years_of_experience: yup
    .number()
    .required('Years of experience is required')
    .min(0, 'Years of experience must be at least 0')
    .max(50, 'Years of experience must be less than 50'),
  
  // Clinic Address
  street: yup
    .string()
    .required('Street address is required')
    .max(200, 'Street address must be less than 200 characters')
    .trim(),
  city: yup
    .string()
    .required('City is required')
    .max(100, 'City must be less than 100 characters')
    .trim(),
  state: yup
    .string()
    .required('State is required')
    .max(50, 'State must be less than 50 characters')
    .trim(),
  zip: yup
    .string()
    .required('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .trim()
}).required();

// Validation schema for editing (without password)
const editSchema = yup.object({
  // Personal Information
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .trim(),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .trim(),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .trim(),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  
  // Professional Information
  specialization: yup
    .string()
    .required('Specialization is required')
    .min(3, 'Specialization must be at least 3 characters')
    .max(100, 'Specialization must be less than 100 characters')
    .trim(),
  license_number: yup
    .string()
    .required('License number is required')
    .matches(/^[A-Za-z0-9]+$/, 'License number must be alphanumeric')
    .trim(),
  years_of_experience: yup
    .number()
    .required('Years of experience is required')
    .min(0, 'Years of experience must be at least 0')
    .max(50, 'Years of experience must be less than 50'),
  
  // Clinic Address
  street: yup
    .string()
    .required('Street address is required')
    .max(200, 'Street address must be less than 200 characters')
    .trim(),
  city: yup
    .string()
    .required('City is required')
    .max(100, 'City must be less than 100 characters')
    .trim(),
  state: yup
    .string()
    .required('State is required')
    .max(50, 'State must be less than 50 characters')
    .trim(),
  zip: yup
    .string()
    .required('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .trim()
}).required();

const ProviderRegistrationDialog = ({ open, onClose, onSuccess, provider = null }) => {
  const isEditMode = !!provider;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    trigger,
    setValue
  } = useForm({
    resolver: yupResolver(isEditMode ? editSchema : registrationSchema),
    mode: 'onChange'
  });

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  // Set form values when editing
  useEffect(() => {
    if (provider && isEditMode) {
      setValue('first_name', provider.first_name);
      setValue('last_name', provider.last_name);
      setValue('email', provider.email);
      setValue('phone_number', provider.phone_number);
      setValue('specialization', provider.specialization);
      setValue('license_number', provider.license_number);
      setValue('years_of_experience', provider.years_of_experience);
      setValue('street', provider.street);
      setValue('city', provider.city);
      setValue('state', provider.state);
      setValue('zip', provider.zip);
    }
  }, [provider, isEditMode, setValue]);

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: 'default', label: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    const strengthMap = {
      0: { color: 'error', label: 'Very Weak' },
      1: { color: 'error', label: 'Weak' },
      2: { color: 'warning', label: 'Fair' },
      3: { color: 'info', label: 'Good' },
      4: { color: 'success', label: 'Strong' },
      5: { color: 'success', label: 'Very Strong' }
    };

    return { strength: score, ...strengthMap[score] };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, replace with actual API call
      console.log(isEditMode ? 'Update data:' : 'Registration data:', data);
      
      onSuccess(data);
      reset();
      onClose();
      setActiveStep(0);
    } catch (error) {
      console.error(isEditMode ? 'Update error:' : 'Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setActiveStep(0);
    onClose();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const specializations = [
    'Psychiatry',
    'Psychology',
    'Clinical Psychology',
    'Child Psychiatry',
    'Addiction Psychiatry',
    'Forensic Psychiatry',
    'Geriatric Psychiatry',
    'Psychotherapy',
    'Counseling',
    'Other'
  ];

  const steps = isEditMode ? [
    {
      label: 'Personal Information',
      icon: <Person />,
      fields: ['first_name', 'last_name', 'email', 'phone_number']
    },
    {
      label: 'Professional Details',
      icon: <Work />,
      fields: ['specialization', 'license_number', 'years_of_experience']
    },
    {
      label: 'Clinic Address',
      icon: <LocationOn />,
      fields: ['street', 'city', 'state', 'zip']
    }
  ] : [
    {
      label: 'Personal Information',
      icon: <Person />,
      fields: ['first_name', 'last_name', 'email', 'phone_number']
    },
    {
      label: 'Security',
      icon: <Security />,
      fields: ['password', 'confirm_password']
    },
    {
      label: 'Professional Details',
      icon: <Work />,
      fields: ['specialization', 'license_number', 'years_of_experience']
    },
    {
      label: 'Clinic Address',
      icon: <LocationOn />,
      fields: ['street', 'city', 'state', 'zip']
    }
  ];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
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
        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            {isEditMode ? 'Edit Provider' : 'Provider Registration'}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {isEditMode 
              ? `Update information for ${provider?.first_name} ${provider?.last_name}`
              : 'Complete the registration form to add a new healthcare provider'
            }
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose} 
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Stepper */}
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 3 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel 
                    StepIconComponent={() => (
                      <Box sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: index <= activeStep ? 'primary.main' : 'grey.300',
                        color: index <= activeStep ? 'white' : 'grey.600',
                        fontSize: '1rem'
                      }}>
                        {step.icon}
                      </Box>
                    )}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step Content */}
          {activeStep === 0 && (
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person />
                  Personal Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('first_name')}
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                      onBlur={() => trigger('first_name')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('last_name')}
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                      onBlur={() => trigger('last_name')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('email')}
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      onBlur={() => trigger('email')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('phone_number')}
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                      onBlur={() => trigger('phone_number')}
                      placeholder="+1 (555) 123-4567"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeStep === 1 && !isEditMode && (
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security />
                  Security Settings
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('password')}
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      onBlur={() => trigger('password')}
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
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    {password && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(passwordStrength.strength / 5) * 100}
                          color={passwordStrength.color}
                          sx={{ height: 6, borderRadius: 3, mb: 1 }}
                        />
                        <Typography variant="caption" color={passwordStrength.color} sx={{ fontWeight: 600 }}>
                          {passwordStrength.label}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('confirm_password')}
                      fullWidth
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={!!errors.confirm_password}
                      helperText={errors.confirm_password?.message}
                      onBlur={() => trigger('confirm_password')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    {confirmPassword && (
                      <Box sx={{ mt: 2 }}>
                        {password === confirmPassword ? (
                          <Chip 
                            icon={<CheckCircle />} 
                            label="Passwords match" 
                            color="success" 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        ) : (
                          <Chip 
                            icon={<Cancel />} 
                            label="Passwords don't match" 
                            color="error" 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {(activeStep === 2 && !isEditMode) || (activeStep === 1 && isEditMode) ? (
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Work />
                  Professional Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.specialization}>
                      <InputLabel>Specialization</InputLabel>
                      <Select
                        {...register('specialization')}
                        label="Specialization"
                        onBlur={() => trigger('specialization')}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      >
                        {specializations.map((spec) => (
                          <MenuItem key={spec} value={spec}>
                            {spec}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.specialization && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                          {errors.specialization.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('license_number')}
                      fullWidth
                      label="License Number"
                      variant="outlined"
                      error={!!errors.license_number}
                      helperText={errors.license_number?.message}
                      onBlur={() => trigger('license_number')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('years_of_experience')}
                      fullWidth
                      label="Years of Experience"
                      type="number"
                      variant="outlined"
                      error={!!errors.years_of_experience}
                      helperText={errors.years_of_experience?.message}
                      onBlur={() => trigger('years_of_experience')}
                      InputProps={{
                        inputProps: { min: 0, max: 50 }
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : null}

          {(activeStep === 3 && !isEditMode) || (activeStep === 2 && isEditMode) ? (
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  Clinic Address
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      {...register('street')}
                      fullWidth
                      label="Street Address"
                      variant="outlined"
                      error={!!errors.street}
                      helperText={errors.street?.message}
                      onBlur={() => trigger('street')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('city')}
                      fullWidth
                      label="City"
                      variant="outlined"
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      onBlur={() => trigger('city')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      {...register('state')}
                      fullWidth
                      label="State"
                      variant="outlined"
                      error={!!errors.state}
                      helperText={errors.state?.message}
                      onBlur={() => trigger('state')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      {...register('zip')}
                      fullWidth
                      label="ZIP Code"
                      variant="outlined"
                      error={!!errors.zip}
                      helperText={errors.zip?.message}
                      onBlur={() => trigger('zip')}
                      placeholder="12345"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : null}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, gap: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600
          }}
        >
          Cancel
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600
              }}
            >
              Back
            </Button>
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              startIcon={isEditMode ? <Edit /> : undefined}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                minWidth: 140,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              {isSubmitting 
                ? (isEditMode ? 'Updating...' : 'Registering...') 
                : (isEditMode ? 'Update Provider' : 'Register Provider')
              }
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderRegistrationDialog; 