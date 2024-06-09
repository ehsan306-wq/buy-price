import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  { question: 'I just submitted a deal - what next? How does your process work?', answer: 'Our process is straightforward. Once you submit a deal, we review it and get back to you within 24 hours.' },
  { question: 'I just submitted a buy price - what next? How does your process work?', answer: 'After you submit a buy price, we evaluate it and provide feedback within 24 hours.' },
  { question: 'What are the requirements for me to submit a buy price?', answer: 'You need to provide accurate property details and your estimated buy price.' }
];

const FaqSection = () => {
  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: '70px', marginBottom:"30px" }}>
        <b> Frequently Asked Questions</b>
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqSection;
