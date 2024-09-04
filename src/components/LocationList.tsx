import React from 'react';
import { List, Typography, Paper } from '@mui/material';
import LocationItem from './LocationItem';
import { Location } from '../types/Location';

type LocationsListProps = {
  locations: Location[];
  openLocationId: number | null;
  onListItemClick: (id: number) => void;
  hasSearched: boolean;
};

const LocationsList = ({
  locations,
  openLocationId,
  onListItemClick,
  hasSearched,
}: LocationsListProps) => {
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
      ) : hasSearched ? (
        <Typography>No locations found within this radius.</Typography>
      ) : null}
    </List>
  );
};

export default LocationsList;
