# Health First Client

A React application built with Material-UI, React Router DOM, and Axios for modern web development.

## 🚀 Features

- **Material-UI**: Modern React UI framework following Material Design principles
- **React Router DOM**: Declarative routing for single-page applications
- **Axios**: Promise-based HTTP client for API calls
- **Custom Theme**: Consistent design system with customizable themes
- **Component Organization**: Well-structured component architecture
- **API Service Layer**: Centralized API management with interceptors

## 📦 Dependencies

### Core Libraries
- `react`: ^19.1.0
- `react-dom`: ^19.1.0

### UI & Design
- `@mui/material`: Material-UI components
- `@emotion/react`: CSS-in-JS library for MUI
- `@emotion/styled`: Styled components for MUI
- `@mui/icons-material`: Material Design icons

### Routing
- `react-router-dom`: Client-side routing

### HTTP Client
- `axios`: Promise-based HTTP client

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Home.jsx        # Home page component
│   ├── About.jsx       # About page component
│   └── Contact.jsx     # Contact page component
├── services/           # API services
│   └── api.js         # Axios configuration and API methods
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Design System

### Material-UI Theme
The application uses a custom Material-UI theme with:
- Primary color: `#1976d2` (Blue)
- Secondary color: `#dc004e` (Pink)
- Consistent spacing and typography
- Responsive breakpoints

### Component Guidelines
- Use MUI components over custom CSS when possible
- Follow Material Design principles
- Use the `sx` prop for component-specific styling
- Implement proper loading states and error handling

## 🔄 Routing

### Route Structure
- `/` - Home page with API data demonstration
- `/about` - About page with feature showcase
- `/contact` - Contact page with form

### Navigation
- Uses `BrowserRouter` as the main router
- Navigation through `Link` components in the AppBar
- Programmatic navigation available via `useNavigate` hook

## 🌐 API Integration

### Axios Configuration
- Centralized API service in `src/services/api.js`
- Request/response interceptors for common functionality
- Automatic token management for authentication
- Error handling and logging

### API Methods
```javascript
// Example usage
import { apiService } from './services/api';

// Get posts
const posts = await apiService.getPosts(10);

// Create a post
const newPost = await apiService.createPost({
  title: 'New Post',
  body: 'Post content'
});
```

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use proper naming conventions
- Implement proper error boundaries

### State Management
- Use React hooks for local state
- Lift state up when necessary
- Consider React Query for server state if needed

### Performance
- Implement proper memoization
- Use lazy loading for routes
- Optimize bundle size with specific imports

## 🔧 Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=https://your-api-url.com
```

**Note**: Vite uses the `VITE_` prefix for environment variables instead of `REACT_APP_`.

## 🚀 Deployment

The application is configured for deployment with Vite. Build artifacts will be in the `dist/` directory after running `npm run build`.

## 📚 Additional Resources

- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Documentation](https://react.dev/)

## 🤝 Contributing

1. Follow the established coding standards
2. Use Material-UI components for UI elements
3. Implement proper error handling
4. Add loading states for API calls
5. Follow the component structure guidelines
