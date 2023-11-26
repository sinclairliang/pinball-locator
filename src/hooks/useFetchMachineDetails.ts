import { useState, useCallback } from 'react';
import { Machine } from '../types/Machine';

const useFetchMachineDetails = () => {
  const [machineDetails, setMachineDetails] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMachineDetails = useCallback(async (locationId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://pinballmap.com/api/v1/locations/${locationId}/machine_details`
      );
      const data = await response.json();
      setMachineDetails(data.machines);
    } catch (err) {
      setError('Error fetching machines');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { machineDetails, loading, error, fetchMachineDetails };
};

export default useFetchMachineDetails;
