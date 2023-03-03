import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
import { Space } from '@mantine/core';
import { PostList } from '@/components/PostList';

export const PostView: FC = () => {
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
      <MapWithNoSSR Marker={<Marker />} />
      <Space h='md' />
      <PostList />
    </>
  );
};
