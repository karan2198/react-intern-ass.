import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const UserDetailsForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user details to localStorage
    localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber, email }));
    // Redirect to the second page
    navigate('/second');
  };

  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    </div>
  );
};

export default UserDetailsForm;
