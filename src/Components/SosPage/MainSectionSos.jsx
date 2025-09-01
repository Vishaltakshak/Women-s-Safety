import axios from "axios";
import React, { useEffect, useState } from "react";

export const MainSectionSos = () => {
  const [sosList, setSosList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSos = async (lat, lng) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/fetch/nearby/sos`,
        {
          params: { coordinates: `${lng},${lat}` }, // backend expects lng,lat
        }
      );
      setSosList(data.data || []);
      console.log(data);
    } catch (err) {
      console.error("Error fetching SOS:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchSos(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-lg font-medium text-gray-600">
        Loading nearby SOS...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚨 Nearby SOS Alerts
        </h1>

        {sosList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sosList.map((sos, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-4 hover:shadow-xl transition"
              >
                <div className="relative w-16 h-16">
  {/* Pulsating ring */}
  <span className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping"></span>

  {/* Static image */}
  <img
    src={sos.user?.imgURL || "/default-avatar.png"}
    alt={sos.name}
    className="w-16 h-16 rounded-full border-2 border-purple-500 object-cover relative z-10"
  />
</div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {sos.name}
                  </h2>
                  <p className="text-sm text-gray-500">{sos.areaName || "Unknown Area"}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                      sos.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {sos.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No SOS found nearby 🚨
          </div>
        )}
      </div>
    </div>
  );
};
