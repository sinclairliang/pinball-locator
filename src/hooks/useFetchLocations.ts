import { useState, useEffect } from 'react';
import axios from 'axios';
import { Location } from '../types/Location';

const useFetchLocations = (
  latitude: number | null,
  longitude: number | null,
  distance: number
) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const params = {
          lat: latitude,
          lon: longitude,
          send_all_within_distance: distance,
          max_distance: distance,
        };
        axios.defaults.headers.post['Content-Type'] =
          'application/x-www-form-urlencoded';

        const response = await axios.get(
          `https://pinballmap.com/api/v1/locations/closest_by_lat_lon`,
          { params }
        );
        const fetchedLocations: Location[] = response.data.locations.map(
          (loc: Location) => ({
            ...loc,
            machines: loc.machine_names.map((name, index) => ({
              name,
              id: loc.machine_ids[index],
            })),
          })
        );

        setLocations(fetchedLocations);
        setLoading(false);
      } catch (err) {
        setError('Error fetching pinball locations');
        setLoading(false);
      }
    };

    if (latitude !== null && longitude !== null) {
      fetchLocations();
    }
  }, [latitude, longitude, distance]);

  return { locations, loading, error };
};

export default useFetchLocations;
