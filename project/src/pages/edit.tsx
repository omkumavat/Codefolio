import  { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';

const Edit = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    profilePicture: '',
    skills: [],
    education: [],
  });

  const {currentUser} = useAuth(); // Assuming this hook provides the current user's info
  const userId = currentUser?.id || ''; // Adjust this based on your auth implementation

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
  
      setFormData({
        username: currentUser.username || '',
        name: currentUser.name || '',
        email: currentUser.email || '',
        // profilePicture: currentUser.profilePicture || '',
        skills: currentUser.skills || [],
        education: currentUser.education || [],
      });0
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value.split(',').map((skill) => skill.trim());
    setFormData({ ...formData, skills: value });
  };

  const handleEducationChange = (e) => {
    const updatedEducation = e.target.value
      .split(',')
      .map((edu) => {
        const [degree, branch, college] = edu.split(';');
        if (!degree || !branch || !college) {
          alert('Please enter education in the format: degree;branch;college');
          return null;
        }
        return { degree, branch, college };
      })
      .filter(Boolean); // Removes null values
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { username, name, email, password, profilePicture, skills, education } = formData;

      if (!username || !email) {
        alert('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      const response = await axios.put('http://localhost:4000/server/user/edit-profile', {
        userId:currentUser._id,
        username,
        name,
        email,
        password,
        profilePicture,
        skills,
        education,
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'There was an error updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Profile Picture URL"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Skills (comma separated)"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Education (degree;branch;college, comma separated)"
              name="education"
              value={formData.education
                .map((edu) => `${edu.degree};${edu.branch};${edu.college}`)
                .join(', ')}
              onChange={handleEducationChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit" disabled={loading} fullWidth>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Edit;
