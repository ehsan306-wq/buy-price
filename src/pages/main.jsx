import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import Header from '../components/header';
import SliderSection from '../components/slider';
import CardsSection from '../components/card';
import FaqSection from '../components/faqsSection';

const EzyResPage = () => {
  return (
    <div>
      <Header />
      <Container sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom className='text-green' style={{ fontWeight: 700 }}>
          We Buy Homes in Florida
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'inline-block',
            padding: '8px 100px',
            borderRadius: '20px',
            backgroundColor: '#42885e',
            color: 'white',
            cursor: 'text',
            textAlign: 'center',
          }}
        >
          Submit your listings and off-market deals for cash offers
        </Typography>

        <Typography variant="h4" gutterBottom style={{ fontWeight: '600', padding: '15px 0' }}>
          How can we help you?
        </Typography>

        <div>
          <Button
            variant="contained"
            sx={{
              margin: '10px',
              backgroundColor: '#42885e',
              padding: '10px 15px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#386048',
              }
            }}
          >
            Request a Buy Price
          </Button>
          <span>OR</span>
          <Button
            variant="contained"
            sx={{
              margin: '10px',
              backgroundColor: '#42885e',
              padding: '10px 15px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#386048',
              }
            }}
          >
            Submit a Deal
          </Button>
        </div>
        <CardsSection />
        <SliderSection />
        <FaqSection />
      </Container>
    </div>
  );
};

export default EzyResPage;
