import React, { useState } from 'react';
import useFetchLocations from './hooks/useFetchLocations';
import LocationsList from './components/LocationList';

const App: React.FC = () => {
  const [radius, setRadius] = useState<number>(10);
  const [openLocationId, setOpenLocationId] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

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
      <input
        type="number"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        placeholder="Enter radius in miles (max 50)"
        max={50}
      />
      <button onClick={handleNearMeClick}>Near Me</button>

      {locations ? (
        <LocationsList
          locations={locations}
          openLocationId={openLocationId}
          onListItemClick={setOpenLocationId}
        />
      ) : (
        <p>No locations found within this radius.</p>
      )}
      {loading && <p>Loading locations...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
