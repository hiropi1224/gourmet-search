import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
import { Space } from '@mantine/core';
import { usePostFormView } from '@/features/postForm/components/hooks/usePostFormView';
import { PostFormTemplate } from '@/features/postForm/components/PostForm/PostFormTemplate';

// type Props = {};

export const PostForm: FC = () => {
  const {
    form,
    handleSubmit,
    editedPost,
    useMutateUploadPostImg,
    UploadImage,
  } = usePostFormView();

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
        {UploadImage()}
        <Space m='md' />
        <MapWithNoSSR Marker={<Marker />} />
      </>
    </PostFormTemplate>
  );
};
