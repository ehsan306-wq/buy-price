import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  { question: 'I just submitted a deal - what next? How does your process work?', answer: 'Our process is straightforward. Once you submit a deal, we review it and get back to you within 24 hours.' },
  { question: 'I just submitted a buy price - what next? How does your process work?', answer: 'After you submit a buy price, we evaluate it and provide feedback within 24 hours.' },
  { question: 'What are the requirements for me to submit a buy price?', answer: 'You need to provide accurate property details and your estimated buy price.' },
  { question: 'Do you lend EMD?', answer: 'No, we do not gator lend. However, if you would like us to put up EMD on a deal then we would have to approve of the contract price first. If we do then we will sign a 60/40 JV (60% to us) and EzyRes LLC will have to go on the PSA with the seller and one of EzyRes’ authorized signers will have to sign the contract.' },
  { question: 'What markets are you in?', answer: 'All of Florida' },
  { question: 'How quickly can you close?', answer: 'Typically in about 7-21 days. We always recommend 21 days or sooner.' },
  { question: 'What ARV % are your buyers buying at?', answer: 'We do not focus on ARV % as this varies depending on the size of the property, the level of rehab, the ARV range, and the location of the property. If you want a copy of our Buy Price Calculator please go to @johngalanrei on instagram and download the tool from the link in his bio! Also toss @helenawuabundance a follow too :).' },
  { question: 'What is your buy box?', answer: 'No 55+ anything' },
  { question: 'What is your preferred title company?', answer: 'Empora Title Virginia Danskin (813) 599-8498 virginia@emporatitle.com deals@emporatitle.com' },
  { question: 'Do you wholesale creative deals?', answer: 'No, we are only wholesaling cash deals at the moment. If you have a creative deal in any major market that cash flows as a LTR then please send it to helena@ezyres.com!' },
  { question: 'I’ve got a turn-key property - will you work it?', answer: 'We do not work turn-key properties unless they are significantly below the 1% rule for a rental or they make sense for a hedge fund (asking price still needs to be somewhat of a discount). The only markets in FL we will look at turn-key deals is Jacksonville, Ft. Myers, Port Charlotte, Orlando, and Tampa. Hedge fund buy box below:' },
];

const FaqSection = () => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <Typography variant="h5" sx={{ marginTop: '70px', marginBottom: "30px" }}>
        <p style={{ textAlign: 'left', fontSize: '20px', fontWeight: 'bold' }}> Frequently Asked Questions</p>
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ textAlign: 'left', color: '#524a4a', fontSize: '14px' }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqSection;
