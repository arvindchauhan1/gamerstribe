import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const SplashScreenContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh',
  backgroundColor: '#0a192f', // Dark blue background color
  color: '#ffffff', // White text color
});

const ContentContainer = styled('div')({
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});


const BottomContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
});

const SplashScreen = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/'); // Change '/' to the actual URL of your homepage
  };

  return (
    <SplashScreenContainer>
      <ContentContainer>
        <Typography variant="h3">Gamer's Connect</Typography>
        {/* <Typography variant="subtitle1" sx={{ marginTop: '1rem' }}>
          Connecting students worldwide
        </Typography> */}
        <Button variant="outlined" color="secondary" onClick={goToHomepage} sx={{ marginTop: '10px' }}>
          Go to Homepage
        </Button>
      </ContentContainer>

      <BottomContainer sx={{ position: 'relative' }}>
        <Typography variant="body1">Team Members: John Doe, Jane Smith</Typography>
        <Typography variant="body1">Project Guide: Prof. Emily Johnson</Typography>
      </BottomContainer>
    </SplashScreenContainer>
  );
};

export default SplashScreen;
