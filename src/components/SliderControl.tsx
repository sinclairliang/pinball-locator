import React from 'react';
import { Button, Slider, Typography } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';

type SliderControlProps = {
  radius: number;
  onRadiusChange: (newRadius: number) => void;
  onNearMeClick: () => void;
};

const SliderControl: React.FC<SliderControlProps> = ({
  radius,
  onRadiusChange,
  onNearMeClick,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onRadiusChange(newValue as number);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
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
        style={{ marginLeft: '25px' }}
      >
        <NearMeIcon /> Near Me
      </Button>
    </div>
  );
};

export default SliderControl;
