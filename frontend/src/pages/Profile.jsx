import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import api from '../api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';

export default function ProfilePage() {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    location: '',
    phone: '',
    img: '',
  });

  useEffect(() => {
    if (id) {
      api.get(`/user/profile/${id}`)
        .then(res => {
          const data = res.data.userDetails;
          setFormData({
            age: data.age || '',
            height: data.height || '',
            weight: data.weight || '',
            location: data.location || '',
            phone: data.phone || '',
            img: data.img || '',
          });
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('age', formData.age);
    form.append('height', formData.height);
    form.append('weight', formData.weight);
    form.append('location', formData.location);
    form.append('phone', formData.phone);

    if (imageFile) {
      form.append('img', imageFile);
    }

    try {
      await api.post(`/user/profile/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile details updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <Box sx={{  mx: 'auto', mt: 3 }}>
      <Card sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={formData.img}
            alt="Profile Image"
            sx={{ width: 100, height: 100, mb: 1 }}
          />
<Tooltip title={formData.img ? 'Change Photo' : 'Upload Photo'}>
  <IconButton
    color="primary"
    component="label"
    sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' }, mt: 1 }}
  >
    <PhotoCamera />
    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
  </IconButton>
</Tooltip>
        </Box>

        <CardContent component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                size='small'
                fullWidth
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                size='small'
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Height (cm)"
                name="height"
                size='small'
                fullWidth
                type="number"
                value={formData.height}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (kg)"
                name="weight"
                size='small'
                fullWidth
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                size='small'
                fullWidth
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color='primary' size="medium">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
