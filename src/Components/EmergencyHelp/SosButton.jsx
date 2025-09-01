import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useSelector } from 'react-redux';

// inside your component
 // adjust this based on your slice structure

const createUserIcon = (imgURL) =>
  L.divIcon({
    html: `<div style="border: 2px solid #1d4ed8; border-radius: 50%; width: 40px; height: 40px; overflow: hidden; box-shadow: 0 0 6px rgba(0,0,0,0.4);">
             <img src="${imgURL}" style="width: 100%; height: 100%; object-fit: cover;" />
           </div>`,
    iconSize: [40, 40],
    className: '',
  });
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const SosButton = () => {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null); // Your location { lat, lng }
  const [loading, setLoading] = useState(true);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { imgURL } = useSelector((state) => state.user);
    const { Name } = useSelector((state) => state.user);
     const { _id } = useSelector((state) => state.user);
  const getUsers = async (coords) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/fetch/nearBy/users`, {
        coordinates: coords,
      });
      const users = res.data.data || [];

      // Sort users by distance
      const sorted = [...users].sort((a, b) => {
        const [lngA, latA] = a?.Location?.coordinates || [0, 0];
        const [lngB, latB] = b?.Location?.coordinates || [0, 0];

        const distA = Math.sqrt((latA - coords[1]) ** 2 + (lngA - coords[0]) ** 2);
        const distB = Math.sqrt((latB - coords[1]) ** 2 + (lngB - coords[0]) ** 2);

        return distA - distB;
      });

      return sorted;
    } catch (err) {
      console.error('Failed to fetch nearby users:', err);
      return [];
    }
  };

  const CreateSos = async()=>{
    try {
      const coords = [location.lng, location.lat];
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create/sos`,{
        id:_id,
        name: Name,
        coordinates: coords,
        status:"active"
  
      },
    {
    headers: { "Content-Type": "application/json" }
  })
      if(!res) toast.error("Error");
      toast.success("SOS Generated")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchLocationAndUsers = async () => {
      if (!showMap) return;

      if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lng: longitude };
          setLocation(userLoc);
          setLoading(false);
          const coords = [userLoc.lng, userLoc.lat];

          const users = await getUsers(coords);
          setNearbyUsers(users);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    };

    fetchLocationAndUsers();
  }, [showMap]);

  return (
    <>
    <div>
      {!showMap ? (
        <div className="flex justify-center">
          <button
            onClick={() => setShowMap(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 text-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            Trigger SOS
          </button>
        </div>
      ) : (
        <div className="mt-8 relative z-0">
          <h3 className="text-center mb-4 text-lg font-medium">Live Location</h3>
          {loading ? (
            <p className="text-center text-gray-600">Getting your location...</p>
          ) : location ? (
            <div className="flex justify-center flex-col items-center">
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={15}
                scrollWheelZoom={true}
                className="h-[250px] md:h-[400px] w-[97%] rounded-xl shadow-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap'
                />

                {/* Your location marker */}
               <Marker
                    position={[location.lat, location.lng]}
                    icon={createUserIcon(imgURL || 'https://i.ibb.co/kq5hXQM/user.png')}
                  >
                    <Popup>You are here 🚨</Popup>
                </Marker>

                {/* Nearby user markers */}
                {nearbyUsers.map((user, index) => {
                  const coords = user?.Location?.coordinates;
                  if (!coords || coords.length !== 2) return null;

                  const [lng, lat] = coords;
                  const isSelected = selectedUser === index;

                  return (
                    <Marker
                      key={index}
                      position={[lat, lng]}
                      eventHandlers={{
                        click: () => setSelectedUser(index),
                      }}
                    >
                      <Popup>{user?.id?.Name || 'Unknown User'}</Popup>
                    </Marker>
                  );
                })}

                {/* Polyline paths to users */}
                {nearbyUsers.map((user, index) => {
                  const coords = user?.Location?.coordinates;
                  if (!coords || coords.length !== 2) return null;

                  const [lng, lat] = coords;
                  const path = [
                    [location.lat, location.lng],
                    [lat, lng],
                  ];
                  const isSelected = selectedUser === index;

                  return (
                    <Polyline
                      key={`line-${index}`}
                      positions={path}
                      color={isSelected ? 'blue' : 'gray'}
                      weight={isSelected ? 4 : 2}
                    />
                  );
                })}
              </MapContainer>

              <div onClick={CreateSos} className="w-full max-w-xs bg-green-100 text-center rounded-full p-4 shadow-inner cursor-pointer mt-6">
                <p className="text-green-800 font-medium">Swipe to Activate SOS</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Couldn’t get your location.</p>
          )}
        </div>
      )}
    </div>
    <ToastContainer></ToastContainer>
  </>
  );
};
