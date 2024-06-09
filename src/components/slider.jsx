import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, Typography } from '@mui/material';

const imagePaths = [
  '/assets/1.jpg',
  '/assets/2.jpg',
  '/assets/3.jpg',
  '/assets/4.jpg',
  '/assets/5.jpg',
  '/assets/6.jpg',
  '/assets/7.jpg',
];

const SliderSection = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000, // Slide will change every 3 seconds
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ]
    };

  return (
    <div style={{ marginTop: '60px' }}>
      <div style={{ padding: '20px', backgroundColor: '#f7724d', borderRadius: '4px', textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom style={{ margin: 0, color: 'white' }}>
          Deal Closed
        </Typography>
      </div>
      <Slider {...settings}>
        {imagePaths.map((image, index) => (
          <div key={index} style={{ padding: '0 10px' }}>
            <Card>
              <CardMedia
                component="img"
                image={image}
                alt={`Slide ${index + 1}`}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderSection;
