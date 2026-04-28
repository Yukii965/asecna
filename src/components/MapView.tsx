import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import type { Terminal } from '../data/types';
import 'leaflet/dist/leaflet.css';

// --- CONFIGURATION DE L'ICÔNE (À NE PAS OUBLIER) ---
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
// ---------------------------------------------------

interface MapViewProps {
  terminals: Terminal[];
  onSelectTerminal: (t: Terminal) => void;
}

const MapView = ({ terminals, onSelectTerminal }: MapViewProps) => {
  const center: [number, number] = [-18.7669, 46.8691];
  
  const bounds: L.LatLngBoundsExpression = [
    [-26.0, 42.0], 
    [-11.0, 52.0]  
  ];

  return (
    <MapContainer 
      center={center} 
      zoom={6} 
      minZoom={5}
      maxBounds={bounds}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {terminals.map((terminal) => (
        <Marker 
          key={terminal.id} 
          position={terminal.coordinates}
          icon={DefaultIcon} // <--- Maintenant il est défini !
          eventHandlers={{
            click: () => onSelectTerminal(terminal),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapView;