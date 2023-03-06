import dynamic from 'next/dynamic';
import { FormEvent, FC, memo, useMemo, useEffect } from 'react';
import {
  TextInput,
  Button,
  Box,
  Space,
  Image,
  Center,
  MultiSelect,
} from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { ImageDrop } from '@/components/features/Common/ImageDrop';
import { useDownloadUrl } from '../hooks/useDownloadUrl';
import { useMutatePost } from '../hooks/useMutatePost';
import { useUploadPostImg } from '../hooks/useUploadPostImg';
import useStore from '../store';

export const PostFormMemo: FC = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const update = useStore((state) => state.updateEditedPost);
  const position = useStore((state) => state.position);
  const initializePosition = useStore((state) => state.initializePosition);
  const { createPostMutation, updatePostMutation } = useMutatePost();
  const { useMutateUploadPostImg } = useUploadPostImg();
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts'
  );

  useEffect(() => {
    initializePosition();
  }, [initializePosition]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        business_day: editedPost.business_day,
        latlng: editedPost.latlng
          ? { lat: editedPost.latlng.lat, lng: editedPost.latlng.lng }
          : null,
      });
      setFullUrl('');
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        business_day: editedPost.business_day,
        latlng: editedPost.latlng
          ? { lat: editedPost.latlng.lat, lng: editedPost.latlng.lng }
          : null,
      });
      setFullUrl('');
    }
  };
  const data = [
    { value: '月', label: '月' },
    { value: '火', label: '火' },
    { value: '水', label: '水' },
    { value: '木', label: '木' },
    { value: '金', label: '金' },
  ];
  const MapWithNoSSR = useMemo(
    () =>
      dynamic(() => import('@/components/PostMap'), {
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

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (editedPost.latlng == null) return;
    if (
      Number(editedPost.latlng.lat) !== position.lat &&
      Number(editedPost.latlng.lng) !== position.lng
    )
      update({
        ...editedPost,
        latlng: { lat: position.lat.toString(), lng: position.lng.toString() },
      });
  }, [editedPost, editedPost.latlng, position.lat, position.lng, update]);

  const width = (window.innerWidth * 2) / 3;

  return (
    <Box sx={{ maxWidth: 800, minWidth: 300, width: width }} mx='auto'>
      <form onSubmit={submitHandler}>
        <TextInput
          mt='md'
          label='店名'
          placeholder='店名'
          required
          value={editedPost.title}
          onChange={(e) => update({ ...editedPost, title: e.target.value })}
        />
        <Space m='md' />
        <MapWithNoSSR Marker={<Marker />} />
        <MultiSelect
          mt='md'
          onChange={(e) => update({ ...editedPost, business_day: e })}
          data={data}
          label='営業日'
          placeholder='営業日'
        />
        <Space m='md' />

        <Center mt='md'>
          {postUrl && (
            <Center>
              <Box>
                <Image
                  src={postUrl}
                  alt='Image'
                  className='rounded'
                  width={300}
                  height={300}
                />
                <Button
                  onClick={() => setFullUrl('')}
                  variant='default'
                  color='red'
                  sx={{ width: '100%', marginTop: '1rem' }}
                >
                  画像削除
                </Button>
              </Box>
            </Center>
          )}
        </Center>

        {!postUrl && (
          <Center mt='md'>
            <ImageDrop />
          </Center>
        )}
        <Space m='md' />
        <Button
          m='auto'
          leftIcon={<IconDatabase />}
          type='submit'
          style={{ display: 'flex' }}
          loading={useMutateUploadPostImg.isLoading}
          disabled={useMutateUploadPostImg.isLoading || !editedPost.title}
        >
          {editedPost.id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Box>
  );
};
export const PostForm = memo(PostFormMemo);
