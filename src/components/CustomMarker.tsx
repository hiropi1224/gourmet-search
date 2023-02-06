import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import { LeafletMouseEvent } from 'leaflet';

import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';

type Props = {
  position: {
    lat: number;
    lng: number;
  };
  setPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

const CustomMarker: FC<Props> = ({ position, setPosition }) => {
  const map = useMap();
  const onClick: (event: LeafletMouseEvent) => void = useCallback((e) => {
    setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMapEvent('click', onClick);

  useEffect(() => {
    map.flyTo(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return position === null ? (
    <></>
  ) : (
    <Marker position={position}>
      <Popup>{`You are here lat:${position.lat} lng:${position.lng}`}</Popup>
    </Marker>
  );
};

export default CustomMarker;
