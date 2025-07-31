import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Chip,
  Box,
  FormHelperText,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Add as AddIcon,
  CalendarToday
} from '@mui/icons-material';

// Validation schema
const patientRegistrationSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  date_of_birth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'You must be at least 13 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13;
      }
      return age >= 13;
    }),
  gender: yup
    .string()
    .required('Please select a gender'),
  street: yup
    .string()
    .required('Street address is required')
    .max(200, 'Street address must be less than 200 characters'),
  city: yup
    .string()
    .required('City is required')
    .max(100, 'City must be less than 100 characters'),
  state: yup
    .string()
    .required('State is required')
    .max(50, 'State must be less than 50 characters'),
  zip: yup
    .string()
    .required('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  emergency_contact_name: yup
    .string()
    .max(100, 'Emergency contact name must be less than 100 characters'),
  emergency_contact_phone: yup
    .string()
    .matches(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number'),
  emergency_contact_relationship: yup
    .string()
    .max(50, 'Relationship must be less than 50 characters'),
  insurance_provider: yup
    .string(),
  policy_number: yup
    .string(),
  medical_history: yup
    .array()
    .of(yup.string())
});

const PatientRegistrationDialog = ({ open, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [newCondition, setNewCondition] = useState('');
  const [includeEmergencyContact, setIncludeEmergencyContact] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [includeMedicalHistory, setIncludeMedicalHistory] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(patientRegistrationSchema),
    mode: 'onChange'
  });

  const handleFieldBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  const handleAddMedicalCondition = () => {
    if (newCondition.trim() && !medicalConditions.includes(newCondition.trim())) {
      const updatedConditions = [...medicalConditions, newCondition.trim()];
      setMedicalConditions(updatedConditions);
      setValue('medical_history', updatedConditions);
      setNewCondition('');
    }
  };

  const handleRemoveMedicalCondition = (condition) => {
    const updatedConditions = medicalConditions.filter(c => c !== condition);
    setMedicalConditions(updatedConditions);
    setValue('medical_history', updatedConditions);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would call an API to register the patient
      console.log('Patient registration data:', data);
      
      // Call success callback
      if (onSuccess) {
        onSuccess(data);
      }
      
      // Reset form
      reset();
      setMedicalConditions([]);
      setNewCondition('');
      setIncludeEmergencyContact(false);
      setIncludeInsurance(false);
      setIncludeMedicalHistory(false);
      
      // Close dialog
      onClose();
    } catch {
      setError('Failed to register patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fafafa'
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Patient Registration
        </Typography>
        <IconButton 
          onClick={onClose} 
          disabled={isLoading}
          sx={{ 
            color: '#7f8c8d',
            '&:hover': { backgroundColor: '#ecf0f1' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Personal Information Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: '#27ae60',
                mb: 2,
                fontSize: '1.1rem'
              }}>
                Personal Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('first_name')}
                    fullWidth
                    label="First Name"
                    placeholder="First Name"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    onBlur={() => handleFieldBlur('first_name')}
                    inputProps={{ maxLength: 50 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('last_name')}
                    fullWidth
                    label="Last Name"
                    placeholder="Last Name"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    onBlur={() => handleFieldBlur('last_name')}
                    inputProps={{ maxLength: 50 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('email')}
                    fullWidth
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    onBlur={() => handleFieldBlur('email')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('phone_number')}
                    fullWidth
                    label="Phone Number"
                    placeholder="Phone Number"
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message}
                    onBlur={() => handleFieldBlur('phone_number')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    fullWidth
                    label="Password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('confirm_password')}
                    fullWidth
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password?.message}
                    onBlur={() => handleFieldBlur('confirm_password')}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('date_of_birth')}
                    fullWidth
                    label="Date of Birth"
                    placeholder="dd/mm/yyyy"
                    type="date"
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth?.message}
                    onBlur={() => handleFieldBlur('date_of_birth')}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: new Date().toISOString().split('T')[0] }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarToday sx={{ color: '#7f8c8d' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      {...register('gender')}
                      label="Gender"
                      onBlur={() => handleFieldBlur('gender')}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          '&.Mui-focused': {
                            borderColor: '#27ae60',
                          },
                        },
                      }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>{errors.gender.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Address Information Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: '#27ae60',
                mb: 2,
                fontSize: '1.1rem'
              }}>
                Address Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('street')}
                    fullWidth
                    label="Street Address"
                    placeholder="Street Address"
                    error={!!errors.street}
                    helperText={errors.street?.message}
                    onBlur={() => handleFieldBlur('street')}
                    inputProps={{ maxLength: 200 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('city')}
                    fullWidth
                    label="City"
                    placeholder="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    onBlur={() => handleFieldBlur('city')}
                    inputProps={{ maxLength: 100 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('state')}
                    fullWidth
                    label="State"
                    placeholder="State"
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    onBlur={() => handleFieldBlur('state')}
                    inputProps={{ maxLength: 50 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    {...register('zip')}
                    fullWidth
                    label="ZIP Code"
                    placeholder="ZIP Code"
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                    onBlur={() => handleFieldBlur('zip')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#27ae60',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Additional Options Section */}
            <Grid item xs={12}>
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: '#f8f9fa', 
                borderRadius: 1,
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#495057' }}>
                  Additional Options
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={includeEmergencyContact}
                          onChange={(e) => setIncludeEmergencyContact(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#27ae60',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#27ae60',
                            },
                          }}
                        />
                      }
                      label="Include Emergency Contact"
                      sx={{ fontSize: '0.9rem' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={includeInsurance}
                          onChange={(e) => setIncludeInsurance(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#27ae60',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#27ae60',
                            },
                          }}
                        />
                      }
                      label="Include Insurance Information"
                      sx={{ fontSize: '0.9rem' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={includeMedicalHistory}
                          onChange={(e) => setIncludeMedicalHistory(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#27ae60',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#27ae60',
                            },
                          }}
                        />
                      }
                      label="Include Medical History"
                      sx={{ fontSize: '0.9rem' }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            {/* Emergency Contact (Optional) */}
            {includeEmergencyContact && (
              <Grid item xs={12}>
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: '#fff3cd', 
                  borderRadius: 1,
                  border: '1px solid #ffeaa7'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                    Emergency Contact
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register('emergency_contact_name')}
                        fullWidth
                        label="Emergency Contact Name"
                        error={!!errors.emergency_contact_name}
                        helperText={errors.emergency_contact_name?.message}
                        onBlur={() => handleFieldBlur('emergency_contact_name')}
                        inputProps={{ maxLength: 100 }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#27ae60',
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register('emergency_contact_phone')}
                        fullWidth
                        label="Emergency Contact Phone"
                        error={!!errors.emergency_contact_phone}
                        helperText={errors.emergency_contact_phone?.message}
                        onBlur={() => handleFieldBlur('emergency_contact_phone')}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#27ae60',
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        {...register('emergency_contact_relationship')}
                        fullWidth
                        label="Relationship"
                        error={!!errors.emergency_contact_relationship}
                        helperText={errors.emergency_contact_relationship?.message}
                        onBlur={() => handleFieldBlur('emergency_contact_relationship')}
                        inputProps={{ maxLength: 50 }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#27ae60',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
            
            {/* Insurance Information (Optional) */}
            {includeInsurance && (
              <Grid item xs={12}>
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: '#d1ecf1', 
                  borderRadius: 1,
                  border: '1px solid #bee5eb'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                    Insurance Information
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register('insurance_provider')}
                        fullWidth
                        label="Insurance Provider"
                        error={!!errors.insurance_provider}
                        helperText={errors.insurance_provider?.message}
                        onBlur={() => handleFieldBlur('insurance_provider')}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#27ae60',
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register('policy_number')}
                        fullWidth
                        label="Policy Number"
                        error={!!errors.policy_number}
                        helperText={errors.policy_number?.message}
                        onBlur={() => handleFieldBlur('policy_number')}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#27ae60',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
            
            {/* Medical History (Optional) */}
            {includeMedicalHistory && (
              <Grid item xs={12}>
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: '#d4edda', 
                  borderRadius: 1,
                  border: '1px solid #c3e6cb'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                    Medical History
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={1}>
                          <Grid item xs>
                            <TextField
                              fullWidth
                              label="Add Medical Condition"
                              value={newCondition}
                              onChange={(e) => setNewCondition(e.target.value)}
                              placeholder="e.g., Diabetes, Hypertension"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#27ae60',
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              onClick={handleAddMedicalCondition}
                              disabled={!newCondition.trim()}
                              sx={{ 
                                height: 56,
                                borderColor: '#27ae60',
                                color: '#27ae60',
                                '&:hover': {
                                  borderColor: '#229954',
                                  backgroundColor: '#f8f9fa'
                                }
                              }}
                            >
                              <AddIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      
                      {medicalConditions.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {medicalConditions.map((condition, index) => (
                            <Chip
                              key={index}
                              label={condition}
                              onDelete={() => handleRemoveMedicalCondition(condition)}
                              color="primary"
                              variant="outlined"
                              sx={{
                                borderColor: '#27ae60',
                                color: '#27ae60',
                                '& .MuiChip-deleteIcon': {
                                  color: '#e74c3c',
                                }
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fafafa'
      }}>
        <Button 
          onClick={onClose}
          disabled={isLoading}
          variant="outlined"
          sx={{
            borderColor: '#27ae60',
            color: '#27ae60',
            '&:hover': {
              borderColor: '#229954',
              backgroundColor: '#f8f9fa'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading || !isValid}
          sx={{
            backgroundColor: isValid ? '#27ae60' : '#bdc3c7',
            color: isValid ? 'white' : '#7f8c8d',
            '&:hover': {
              backgroundColor: isValid ? '#229954' : '#bdc3c7'
            },
            '&:disabled': {
              backgroundColor: '#bdc3c7',
              color: '#7f8c8d'
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Register Patient'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientRegistrationDialog; 