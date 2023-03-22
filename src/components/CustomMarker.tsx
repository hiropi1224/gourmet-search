import React, { FC, useCallback, useEffect } from 'react';
import { Text } from '@mantine/core';
import { LeafletMouseEvent } from 'leaflet';

import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import useStore from '@/store';

const CustomMarker: FC = () => {
  const map = useMap();
  const position = useStore((state) => state.position);
  const setPosition = useStore((state) => state.setPosition);
  const restaurantInfo = useStore((state) => state.restaurantInfo);
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
    <Marker position={position} draggable>
      <Popup>
        <Text size='xl' fw='bold'>
          {restaurantInfo.title}
        </Text>
        <Text>{`lat:${position.lat}`}</Text>
        <Text>{`lng:${position.lng}`}</Text>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
