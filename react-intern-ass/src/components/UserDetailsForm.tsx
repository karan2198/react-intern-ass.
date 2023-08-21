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
    if (!name || !phoneNumber || !email) {
      alert('Please fill in all fields properly.');
      return;
    }
    if (phoneNumber.length !== 10) {
      alert('Phone number should be 10 digits.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Save user details to localStorage
    localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber, email }));
    // Redirect to the second page
    navigate('/second');
  };
  const isValidEmail = (value: string) => {
    // Very basic email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', margin: '40em', marginRight: '0em', width: '300px', }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
