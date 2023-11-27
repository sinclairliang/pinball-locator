import React from 'react';
import { Button, Slider, Typography, TextField, Divider } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';

type SliderControlProps = {
  radius: number;
  onRadiusChange: (newRadius: number) => void;
  onNearMeClick: () => void;
  latitude: number | null;
  longitude: number | null;
  onCoordinatesChange: (lat: number, lng: number) => void;
};

const SliderControl: React.FC<SliderControlProps> = ({
  radius,
  onRadiusChange,
  onNearMeClick,
  latitude,
  longitude,
  onCoordinatesChange,
}) => {
  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLat = event.target.value;
    onCoordinatesChange(newLat ? parseFloat(newLat) : 0, longitude ?? 0);
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLng = event.target.value;
    onCoordinatesChange(latitude ?? 0, newLng ? parseFloat(newLng) : 0);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onRadiusChange(newValue as number);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginTop: '20px', marginRight: '20px' }}>
        <TextField
          label="Latitude"
          type="number"
          value={latitude !== null ? latitude.toString() : ''}
          onChange={handleLatitudeChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Longitude"
          type="number"
          value={longitude !== null ? longitude.toString() : ''}
          onChange={handleLongitudeChange}
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ marginTop: '20px', marginLeft: '20px' }}>
        <Typography gutterBottom>Radius: {radius} miles</Typography>
        <Slider
          value={radius}
          onChange={handleSliderChange}
          aria-labelledby="radius-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={50}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onNearMeClick}
        style={{ marginTop: '25px', marginLeft: '25px' }}
      >
        <NearMeIcon /> Near Me
      </Button>
    </div>
  );
};

export default SliderControl;
