import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { Space } from '@mantine/core';
import { ComponentMeta } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePostFormView } from '@/features/postForm/components/hooks/usePostFormView';
import { ImageDrop } from '@/common/components/ImageDrop';
import { PostFormTemplate } from './PostFormTemplate';
const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
export default {
  title: 'PostForm/PostFormTemplate',
  component: PostFormTemplate,
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={mockedQueryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} as ComponentMeta<typeof PostFormTemplate>;

export const Primary = (): JSX.Element => {
  const { form, handleSubmit, editedPost, useMutateUploadPostImg } =
    usePostFormView();

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
    <PostFormTemplate
      form={form}
      handleSubmit={handleSubmit}
      editedPost={editedPost}
      useMutateUploadPostImg={useMutateUploadPostImg}
    >
      <>
        <Space m='md' />
        <ImageDrop
          useMutateUploadPostImg={useMutateUploadPostImg}
          loading={useMutateUploadPostImg.isLoading}
        />
        <Space m='md' />
        <MapWithNoSSR Marker={<Marker />} />
      </>
    </PostFormTemplate>
  );
};
