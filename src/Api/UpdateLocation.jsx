import { useEffect } from "react";
import axios from "axios";

export const useAutoLocationUpdater = (userId) => {
  useEffect(() => {
    if (!userId) return;

    const updateLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/user/update/locations/${userId}`,
                {
                  coordinates: [longitude, latitude], // Order matters: [lng, lat]
                }
              );
              console.log("✅ Location updated");
            } catch (err) {
              console.error("❌ Failed to update location:", err);
            }
          },
          (err) => {
            console.warn("❌ Geolocation error:", err);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    };

    updateLocation();

    const intervalId = setInterval(updateLocation, 30 * 1000); // Every 30 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, [userId]);
};
