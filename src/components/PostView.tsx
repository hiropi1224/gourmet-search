import React, { FC, useMemo } from 'react';
import { Space } from '@mantine/core';
import dynamic from 'next/dynamic';
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

  return (
    <>
      <MapWithNoSSR />
      <Space h='md' />
      <PostList />
    </>
  );
};
