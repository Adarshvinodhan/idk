import { useEffect, useState } from 'react';
import api from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Avatar,        // <-- import Avatar
  Box,
} from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/user/allusers')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  if (loading)
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <TableContainer
      component={Paper}
      style={{
        width: '80%',
        overflowX: 'auto',
        margin: 'auto',
        marginTop: 20,
        maxWidth: '100vw',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Table stickyHeader sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
            <TableCell sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
              Email
            </TableCell>
            <TableCell sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
              Last Logged In
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={user.details?.img || "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"}          // <-- user image url here
                    alt={user.name}
                    sx={{ width: 32, height: 32 }}  
                  />
                  {user.name}
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.lastLoggedIn
                  ? new Date(user.lastLoggedIn).toLocaleString()
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
