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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
          dots: false
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
      <div style={{ padding: '30px', backgroundColor: '#42885e', borderRadius: '4px', textAlign: 'left' }}>
        <Typography variant="h5" gutterBottom style={{ margin: 0, color: 'white', fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}>
          Deals Closed
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 foregroundColor" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </Typography>
      </div>
      <Slider {...settings}>
        {imagePaths.map((image, index) => (
          <div key={index} style={{ padding: '0 10px' }}>
            <Card style={{ margin: '10px 15px' }}>
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
