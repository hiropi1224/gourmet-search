import React, { FC, useMemo, useState } from 'react';
import { Space } from '@mantine/core';
import dynamic from 'next/dynamic';
import { PostList } from '@/components/PostList';

export const PostView: FC = () => {
  const [position, setPosition] = useState({
    lat: 35.672909594409305,
    lng: 139.71265654633325,
  });
  const MapWithNoSSR = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const Marker = useMemo(
    () =>
      dynamic(() => import('@/components/CustomMarker'), {
        loading: () => <>...loading</>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <MapWithNoSSR
        Marker={<Marker position={position} setPosition={setPosition} />}
      />
      <Space h='md' />
      <PostList setPosition={setPosition} />
    </>
  );
};
