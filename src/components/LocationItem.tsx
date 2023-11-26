import React from 'react';
import {
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
  List,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { Location } from '../types/Location';

type LocationItemProps = {
  location: Location;
  isOpen: boolean;
  onToggle: () => void;
};

const LocationItem: React.FC<LocationItemProps> = ({
  location,
  isOpen,
  onToggle,
}) => {
  const createGoogleMapsLink = (location: Location) => {
    const query = `${location.street}, ${location.city}, ${location.state}, ${location.zip}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
  };

  return (
    <>
      <ListItem button onClick={onToggle}>
        <ListItemText
          primary={location.name}
          secondary={`${location.street}, ${location.city}, ${location.state} ${location.zip}`}
        />
        <ListItemIcon>
          <IconButton
            edge="end"
            aria-label="google-maps"
            href={createGoogleMapsLink(location)}
            target="_blank"
          >
            <MapIcon />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {location.machine_names.map((machine, idx) => (
            <ListItem key={idx} button style={{ paddingLeft: '30px' }}>
              <ListItemText primary={machine} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default LocationItem;
