import { FC } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.imagePath =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

const initPosition = {
  lat: 35.672909594409305,
  lng: 139.71265654633325,
};

type Props = {
  Marker: JSX.Element;
};

const Map: FC<Props> = ({ Marker }) => {
  return (
    <MapContainer
      center={initPosition}
      zoom={18}
      scrollWheelZoom={true}
      style={{ height: '400px', margin: 'auto' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {Marker}
    </MapContainer>
  );
};

export default Map;
