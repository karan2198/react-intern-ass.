import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserDetailsForm from './components/UserDetailsForm';
import SecondPage from './components/SecondPage';
const App: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Routes>
          <Route path="/" element={<UserDetailsForm />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
