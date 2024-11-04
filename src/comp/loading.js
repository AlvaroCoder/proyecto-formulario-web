// components/Loading.js
'use client'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin-slow flex flex-col justify-center items-center">
        <Image
          src="/cosai-logo.png"
          alt="COSAI Logo"
          width={200}
          height={200}
          className="w-24 h-24 object-contain"
        />
        <Box sx={{display : 'flex'}}>
            <CircularProgress/>
        </Box>
      </div>
      
    </div>
  );
};

export default Loading;