// src/pages/VerifyEmail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying...');
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/auth/verifyemail`, {
          params: { token, email },
          withCredentials: true,
        });
        console.log(res.data);
        
        setMessage(res?.data?.message || 'Email verified successfully!');
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Verification failed.');
      }
    };
    if (token && email) verify();
    else setMessage("Invalid verification link.");
  }, [token, email]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
