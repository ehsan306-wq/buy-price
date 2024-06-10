import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import Header from '../components/header';
import SliderSection from '../components/slider';
import CardsSection from '../components/card';
import FaqSection from '../components/faqsSection';
import BuyPriceForm from '../components/SubmissionForms/buyPriceForm';
import SubmitDealForm from '../components/SubmissionForms/submitDealForm';

const EzyResPage = () => {
  const [showBuyPriceForm, setShowBuyPriceForm] = useState(false);
  const [showSubmitDealForm, setShowSubmitDealForm] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const [isChildFormCalled, setShowChildForm] = useState(false);

  const handleBuyPriceClick = () => {
    setShowBuyPriceForm(true);
    setShowSubmitDealForm(false);
    setShowReturnButton(true);
    setShowChildForm(true);
  };

  const handleSubmitDealClick = () => {
    setShowSubmitDealForm(true);
    setShowBuyPriceForm(false);
    setShowReturnButton(true);
    setShowChildForm(true);
  };

  const handleReturnClick = () => {
    setShowBuyPriceForm(false);
    setShowSubmitDealForm(false);
    setShowReturnButton(false);
    setShowChildForm(false);
  };

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

        {showBuyPriceForm && <BuyPriceForm onReturnClick={handleReturnClick} />}
        {showSubmitDealForm && <SubmitDealForm onReturnClick={handleReturnClick} />}

        <div>
          {(!showSubmitDealForm && !isChildFormCalled) && (
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
              onClick={() => {
                handleBuyPriceClick();
                setShowReturnButton(true);
              }}
            >
              Request a Buy Price
            </Button>
          )}
          {(!showBuyPriceForm && !isChildFormCalled) && (
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
              onClick={() => {
                handleSubmitDealClick();
                setShowReturnButton(true);
              }}
            >
              Submit a Deal
            </Button>
          )}
        </div>

        <CardsSection />
        <SliderSection />
        <FaqSection />
      </Container>
    </div>
  );
};

export default EzyResPage;
