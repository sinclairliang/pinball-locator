import React from 'react';
import { List, Typography, Paper } from '@mui/material';
import LocationItem from './LocationItem';
import { Location } from '../types/Location';

type LocationsListProps = {
  locations: Location[];
  openLocationId: number | null;
  onListItemClick: (id: number) => void;
};

const LocationsList: React.FC<LocationsListProps> = ({ locations, openLocationId, onListItemClick }) => {
  return (
    <List component="nav">
      {locations.length > 0 ? (
        locations.map((location) => (
          <Paper key={location.id} elevation={3} style={{ margin: '10px 0' }}>
            <LocationItem
              location={location}
              isOpen={openLocationId === location.id}
              onToggle={() => onListItemClick(location.id)}
            />
          </Paper>
        ))
      ) : (
        <Typography>No locations found within this radius.</Typography>
      )}
    </List>
  );
};

export default LocationsList;
