import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const cardData = [
  { title: 'Agents', description: 'Represent and earn hefty deals of commissions.', icon: PeopleIcon },
  { title: 'Wholesalers', description: 'Submit your preferences. All sorts of deals welcome!', icon: LocalShippingIcon },
  { title: 'Property Managers', description: 'We buy occupied homes. We got the easy renovations.', icon: HomeWorkIcon },
  { title: 'Fast Decisions', description: 'Within 24 hours', icon: AccessTimeIcon },
  { title: 'Cash Purchases', description: 'Within 7 days', icon: AttachMoneyIcon },
  { title: 'Flexible', description: 'On timeline and contracts', icon: SyncAltIcon },
];

const CardsSection = () => {
  return (
    <div style={{ padding: '30px', backgroundColor: 'whitesmoke', marginTop: "20px" }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: '600', padding: '15px 0' }}>
          Why Work With Us
        </Typography>
        <Grid container spacing={4} style={{ padding: '20px' }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: "10px" }}>
                <card.icon style={{ fontSize: '48px', marginBottom: '8px', color: '#f7724d' }} />
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {card.title}
                </Typography>
                <Typography style={{ textAlign: 'center' }}>{card.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CardsSection;
