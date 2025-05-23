import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const AuthForm = ({ title, onSubmit, showNameField = false, linkText, linkPath, errors = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      width="80%"
      maxWidth={500} 
      mx="auto"
      px={10}
      py={5}
      boxShadow={4}
      borderRadius={3}
      bgcolor="white"
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {title}
        </Typography>

        {showNameField && (
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            variant="standard"
            error={Boolean(errors.name)}
            helperText={errors.name ? errors.name.join(' ') : ''}
          />
        )}

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          size="large"
          variant="standard"
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.join(' ') : ''}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          size="small"
          variant="standard"
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.join(' ') : ''}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          size="small"
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          {title}
        </Button>

        <Typography variant="body2" textAlign="center">
          <Link to={linkPath} style={{ textDecoration: 'underline' }}>
            {linkText}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default AuthForm;
