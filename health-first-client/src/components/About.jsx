import { Container, Typography, Box, Paper } from '@mui/material';
import { 
  Palette, 
  Route, 
  Api, 
  Code, 
  Brush, 
  Speed 
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <Palette />,
      title: 'Material-UI',
      description: 'Modern React UI framework following Material Design principles'
    },
    {
      icon: <Route />,
      title: 'React Router DOM',
      description: 'Declarative routing for React applications'
    },
    {
      icon: <Api />,
      title: 'Axios',
      description: 'Promise-based HTTP client for API calls'
    },
    {
      icon: <Code />,
      title: 'React Hooks',
      description: 'Modern React patterns with functional components'
    },
    {
      icon: <Brush />,
      title: 'Custom Theme',
      description: 'Consistent design system with customizable themes'
    },
    {
      icon: <Speed />,
      title: 'Performance',
      description: 'Optimized for fast loading and smooth interactions'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Health First
      </Typography>
      <Typography variant="body1" paragraph>
        This project demonstrates the integration of modern React development tools and libraries:
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Paper key={index} sx={{ p: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, color: 'primary.main' }}>
              {feature.icon}
            </Box>
            <Box>
              <Typography variant="h6" component="h3">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default About; 