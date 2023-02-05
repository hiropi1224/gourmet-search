import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { LeafletMouseEvent } from 'leaflet';

import { Marker, Popup, useMapEvent } from 'react-leaflet';

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
  const onClick: (event: LeafletMouseEvent) => void = useCallback((e) => {
    setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
  }, []);
  useMapEvent('click', onClick);

  return position === null ? (
    <></>
  ) : (
    <Marker position={position}>
      <Popup>{`You are here lat:${position.lat} lng:${position.lng}`}</Popup>
    </Marker>
  );
};

export default CustomMarker;
