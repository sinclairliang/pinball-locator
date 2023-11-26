import React, { useState } from 'react';
import useFetchLocations from './hooks/useFetchLocations';
import LocationsList from './components/LocationList';
import LoadingErrorDisplay from './components/LoadingErrorDisplay';
import SliderControl from './components/SliderControl';
const App: React.FC = () => {
  const [radius, setRadius] = useState<number>(10);
  const [openLocationId, setOpenLocationId] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { locations, loading, error } = useFetchLocations(
    latitude,
    longitude,
    radius
  );

  const handleNearMeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setHasSearched(true);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  return (
    <div>
      <SliderControl
        radius={radius}
        onRadiusChange={setRadius}
        onNearMeClick={handleNearMeClick}
      />

      <LoadingErrorDisplay loading={loading} error={error} />

      <LocationsList
        locations={locations}
        openLocationId={openLocationId}
        onListItemClick={setOpenLocationId}
        hasSearched={hasSearched}
      />
    </div>
  );
};

export default App;
