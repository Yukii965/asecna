import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  ZoomControl,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';

import React from 'react';
import L from 'leaflet';

import type { Terminal } from '../data/types';

import 'leaflet/dist/leaflet.css';

// --- CONFIGURATION DE L'ICÔNE ---
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
// ------------------------------

// =======================
// MAP CLICK HANDLER
// =======================
const MapClickHandler = ({
  onMapClick,
  isAddingMode,
}: {
  onMapClick: (coords: [number, number]) => void;
  isAddingMode: boolean;
}) => {

  useMapEvents({
    click(e) {
      if (isAddingMode) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return null;
};

// =======================
// PROPS
// =======================
interface MapViewProps {
  terminals: Terminal[];

  onSelectTerminal: (t: Terminal) => void;

  // ✅ AJOUT
  isAddingMode: boolean;

  onMapClick: (coords: [number, number]) => void;
}

// =======================
// COMPONENT
// =======================
const MapView = ({
  terminals,
  onSelectTerminal,
  isAddingMode,
  onMapClick,
}: MapViewProps) => {

  const center: [number, number] = [-18.7669, 46.8691];

  const bounds: L.LatLngBoundsExpression = [
    [-26.0, 42.0],
    [-11.0, 52.0],
  ];

  return (
    <MapContainer
      center={center}
      zoom={6}
      minZoom={5}
      maxBounds={bounds}
      zoomControl={false}
      className="h-full w-full z-0 bg-slate-950"
    >
      {/* =======================
          TILE LAYER
      ======================= */}
      <TileLayer
        attribution="&copy; CartoDB"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* =======================
          CLICK HANDLER
      ======================= */}
      <MapClickHandler
        onMapClick={onMapClick}
        isAddingMode={isAddingMode}
      />

      {/* =======================
          TERMINALS
      ======================= */}
      {terminals.map((terminal) => (
        <React.Fragment key={terminal.id}>

          {/* Zone radio */}
          <Circle
            center={terminal.coordinates}
            radius={50000}
            pathOptions={{
              color: '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: 0.03,
              weight: 1,
              dashArray: '5, 10',
            }}
          />

          {/* Marker */}
          <Marker
            position={terminal.coordinates}
            icon={DefaultIcon}
            eventHandlers={{
              click: () => onSelectTerminal(terminal),
            }}
          >

            {/* Tooltip */}
            <Tooltip
              direction="top"
              offset={[0, -32]}
              opacity={1}
              sticky
              className="custom-tooltip"
            >
              <div className="bg-slate-900 text-white p-2 rounded-lg border border-slate-700 shadow-xl">

                <p className="font-bold text-blue-400 text-sm">
                  {terminal.name}
                </p>

                <div className="flex gap-2 mt-1">

                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                    ID: {terminal.id}
                  </span>

                  <span className="text-[10px] bg-green-500/20 px-1.5 py-0.5 rounded text-green-400">
                    VHF OK
                  </span>

                </div>
              </div>
            </Tooltip>
          </Marker>
        </React.Fragment>
      ))}

      {/* =======================
          ZOOM CONTROL
      ======================= */}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default MapView;