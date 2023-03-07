import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
import { Space } from '@mantine/core';
import { useQueryPosts } from '@/hooks/useQueryPosts';
import useStore from '@/store';
import { PostList } from '@/features/postList/components/PostList';

export const Post: FC = () => {
  const { data: posts } = useQueryPosts();
  const session = useStore((state) => state.session);
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

  if (posts === undefined) return null;
  if (session === null) return null;

  return (
    <>
      <MapWithNoSSR Marker={<Marker />} />
      <Space h='md' />
      <PostList posts={posts} session={session} />
    </>
  );
};
