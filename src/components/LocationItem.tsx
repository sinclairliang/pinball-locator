import React, { useEffect } from 'react';
import { Location } from '../types/Location';
import useFetchMachineDetails from '../hooks/useFetchMachineDetails';
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  ListItemIcon,
  CircularProgress,
  Typography,
} from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import LaunchIcon from '@mui/icons-material/Launch';

interface LocationItemProps {
  location: Location;
  isOpen: boolean;
  onToggle: () => void;
}

const LocationItem: React.FC<LocationItemProps> = ({
  location,
  isOpen,
  onToggle,
}) => {
  const { machineDetails, loading, error, fetchMachineDetails } =
    useFetchMachineDetails();

  useEffect(() => {
    if (isOpen) {
      fetchMachineDetails(location.id);
    }
  }, [isOpen, location.id, fetchMachineDetails]);

  const createGoogleMapsLink = (location: Location): string => {
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
            <DirectionsIcon color="primary" />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {loading ? (
            <ListItem>
              <CircularProgress />
            </ListItem>
          ) : error ? (
            <ListItem>
              <Typography color="error">{error}</Typography>
            </ListItem>
          ) : (
            <Table>
              <TableBody>
                {machineDetails.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell>
                      {machine.name}
                      <IconButton
                        edge="end"
                        aria-label="google-maps"
                        href={machine.ipdb_link}
                        target="_blank"
                      >
                        <LaunchIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

export default LocationItem;
