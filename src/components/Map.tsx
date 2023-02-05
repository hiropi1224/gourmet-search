import { FC, useCallback, useState } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.imagePath =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

const initPosition = {
  lat: 35.672909594409305,
  lng: 139.71265654633325,
};

function LocationMarker() {
  const [position, setPosition] = useState(initPosition);

  const onClick: (event: LeafletMouseEvent) => void = useCallback((e) => {
    setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
  }, []);
  useMapEvent('click', onClick);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{`You are here lat:${position.lat} lng:${position.lng}`}</Popup>
    </Marker>
  );
}

const Map: FC = () => {
  const wid = window.innerWidth / 2;

  return (
    <MapContainer
      center={initPosition}
      zoom={18}
      scrollWheelZoom={true}
      style={{ height: '400px', width: wid, margin: 'auto' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
