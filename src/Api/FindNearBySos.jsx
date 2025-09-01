// hooks/useNearbySos.js
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useNearbySos = (lat, lng, pollInterval = 10000) => {
  const [sosList, setSosList] = useState([]);
  const lastSosId = useRef(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchNearbySos = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/fetch/nearby/sos`,
          {
            params: { coordinates: `${lng},${lat}` },
          }
        );

        if (Array.isArray(data.data)) {
          setSosList(data.data);

          // detect new SOS
          const newest = data.data[0];
          if (newest && lastSosId.current !== newest._id) {
            lastSosId.current = newest._id;
            // return true or trigger callback logic in App.jsx
          }
        }
      } catch (err) {
        console.error("❌ Error fetching nearby SOS:", err);
      }
    };

    fetchNearbySos();
    const intervalId = setInterval(fetchNearbySos, pollInterval);

    return () => clearInterval(intervalId);
  }, [lat, lng, pollInterval]);

  return sosList;
};
