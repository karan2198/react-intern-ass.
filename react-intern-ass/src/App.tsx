import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserDetailsForm from './components/UserDetailsForm';
import SecondPage from './components/SecondPage';
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserDetailsForm />} />
        <Route path="/second" element={<SecondPage/>} />
      </Routes>
    </>
  );
};

export default App;
