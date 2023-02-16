import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import { Text } from '@mantine/core';
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
  title?: string;
};

const CustomMarker: FC<Props> = ({ position, setPosition, title }) => {
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
      <Popup>
        <Text>{title}</Text>
        <Text>{`lat:${position.lat}`}</Text>
        <Text>{`lng:${position.lng}`}</Text>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
