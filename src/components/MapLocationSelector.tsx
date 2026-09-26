"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

interface MapLocationSelectorProps {
  locations: LocationData[];
  setLocations: (locs: LocationData[]) => void;
}

function LocationMarker({ addLocation }: { addLocation: (name: string, lat: number, lng: number) => void }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      
      try {
        const response = await fetch(`/api/geocode?lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        let placeName = data.address?.city || data.address?.state || data.address?.country || "Unknown Location";
        if (placeName !== "Unknown Location") {
          addLocation(placeName, lat, lng);
        } else {
          addLocation(`Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`, lat, lng);
        }
      } catch (error) {
        console.error("Geocoding error", error);
      }
    },
  });

  return null;
}

// Custom hook to search and pan map
function SearchControl({ searchText, onClear }: { searchText: string, onClear: () => void }) {
  const map = useMap();

  useEffect(() => {
    if (!searchText) return;
    
    const search = async () => {
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(searchText)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          map.flyTo([parseFloat(lat), parseFloat(lon)], 10);
        }
      } catch (error) {
        console.error("Search error", error);
      }
    };
    
    const timer = setTimeout(search, 1000); // debounce
    return () => clearTimeout(timer);
  }, [searchText, map]);

  return null;
}

function AutoLocateControl({ enabled }: { enabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (!enabled || !("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 12);
      },
      (error) => {
        console.warn("Geolocation failed or denied:", error);
      },
      { timeout: 10000 }
    );
  }, [map, enabled]);

  return null;
}

export default function MapLocationSelector({ locations, setLocations }: MapLocationSelectorProps) {
  const [searchText, setSearchText] = useState("");

  const handleAddLocation = (name: string, lat: number, lng: number) => {
    if (!locations.find(l => l.name === name)) {
      setLocations([...locations, { name, lat, lng }]);
    }
  };

  const handleRemove = (name: string) => {
    setLocations(locations.filter(l => l.name !== name));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full h-80 md:h-[450px] rounded-2xl overflow-hidden border border-gray-800 relative z-0 shadow-2xl">
        
        {/* Floating Search Bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[85%] md:w-[60%] z-[1000]">
          <input 
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for a location..."
            className="w-full bg-white text-black border-none rounded-full px-6 py-4 shadow-[0_4px_25px_rgba(0,0,0,0.6)] outline-none font-bold text-center placeholder:text-gray-500 placeholder:font-medium transition-all focus:ring-4 focus:ring-[#a65abf]/30"
          />
          {searchText && (
            <button onClick={() => setSearchText("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-bold p-2 transition-colors">✕</button>
          )}
        </div>

        <MapContainer 
          center={locations.length > 0 ? [locations[locations.length - 1].lat, locations[locations.length - 1].lng] : [20, 0]} 
          zoom={locations.length > 0 ? 5 : 2} 
          attributionControl={false} 
          zoomControl={false} 
          style={{ height: "100%", width: "100%", background: "#e5e7eb" }}
        >
          <ZoomControl position="bottomright" />
          {locations.length === 0 && <AutoLocateControl enabled={true} />}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />
          <SearchControl searchText={searchText} onClear={() => setSearchText("")} />
          <LocationMarker addLocation={handleAddLocation} />
          {locations.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lng]} icon={icon}>
              <Popup className="bg-white text-black font-semibold">
                {m.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {locations.length === 0 && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-md rounded-lg p-2 text-xs text-center text-gray-800 font-medium pointer-events-none z-[400] shadow">
            Click anywhere on the map to add a location.
          </div>
        )}
      </div>

      <div className="w-full mt-2">
        <h3 className="text-[15px] font-bold text-white mb-3">Locations Added</h3>
        {locations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <span key={loc.name} className="px-3 py-1.5 bg-[#a65abf]/20 border border-[#a65abf]/50 text-white rounded-full text-sm flex items-center gap-2">
                {loc.name}
                <button onClick={() => handleRemove(loc.name)} className="text-[#a65abf] hover:text-white transition-colors">✕</button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-red-400 text-sm">No location added</p>
        )}
      </div>
    </div>
  );
}
