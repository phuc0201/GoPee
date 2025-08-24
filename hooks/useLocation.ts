import { Location } from "@/models/location.model";
import {
  getCurrentDropoffLocation,
  getCurrentLocation,
} from "@/services/geolocation.service";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

const useLocation = () => {
  const [pickupLocation, setPickupLocation] = useState<Location>();
  const [dropoffLocation, setDropoffLocation] = useState<Location>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchLocation = async () => {
        try {
          setLoading(true);
          setError(null);

          const [pickup, dropoffs] = await Promise.all([
            getCurrentLocation(),
            getCurrentDropoffLocation(),
          ]);

          if (pickup) setPickupLocation(pickup);
          if (dropoffs) setDropoffLocation(dropoffs[dropoffs.length - 1]);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch location"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchLocation();
    }, [])
  );

  return { pickupLocation, dropoffLocation, loading, error };
};

export default useLocation;
