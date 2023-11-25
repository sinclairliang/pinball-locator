import { Location } from './types/Location';
import React, { useState } from 'react';
import axios from 'axios';

async function fetchPinballLocationsWithinDistance(
  latitude: number,
  longitude: number,
  distance: number
): Promise<Location[]> {
  try {
    const params = {
      lat: latitude,
      lon: longitude,
      send_all_within_distance: distance,
      max_distance: distance,
    };
    const response = await axios.get(
      `https://pinballmap.com/api/v1/locations/closest_by_lat_lon`,
      { params }
    );
    return response.data.locations;
  } catch (error) {
    console.error('Error fetching pinball locations:', error);
    return [];
  }
}
const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [radius, setRadius] = useState<number>(10);
  const handleNearMeClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const validRadius = Math.min(radius, 50);
          const fetchedLocations = await fetchPinballLocationsWithinDistance(
            position.coords.latitude,
            position.coords.longitude,
            validRadius
          );
          setLocations(fetchedLocations);
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
        locations.map((location, index) => (
          <div key={index}>
            <h2>{location.name}</h2>
            <p>
              {location.street}, {location.city}, {location.state}{' '}
              {location.zip}
            </p>
            <h3>Available Machines:</h3>
            {location.machine_names && location.machine_names.length > 0 ? (
              <ul>
                {location.machine_names.map((machine, idx) => (
                  <li key={idx}>{machine}</li>
                ))}
              </ul>
            ) : (
              <p>No machines nearby.</p>
            )}
          </div>
        ))
      ) : (
        <p>No locations found within this radius.</p>
      )}
    </div>
  );
};

export default App;
