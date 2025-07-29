import { useState, useEffect } from 'react';
import { getMockMovements } from '../mockdata';
import { MovementData } from './types.ts';

export const useMovementData = () => {
  const [data, setData] = useState<MovementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        const freshData = getMockMovements();
        setData([...freshData]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    let interval: number | null = null;
    if (isAutoUpdate) {
      interval = setInterval(fetchData, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoUpdate]);

  const handleRefresh = () => {
    const freshData = getMockMovements();
    setData([...freshData]);
  };

  const toggleAutoUpdate = () => {
    setIsAutoUpdate(!isAutoUpdate);
  };

  return {
    data,
    loading,
    isAutoUpdate,
    handleRefresh,
    toggleAutoUpdate
  };
};