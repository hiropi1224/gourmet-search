import { FormEvent, FC, memo, useMemo, useState, useEffect } from 'react';
import { CameraIcon } from '@heroicons/react/solid';
import {
  TextInput,
  Loader,
  Button,
  Box,
  Space,
  Image,
  Center,
  Text,
  Group,
  MultiSelect,
} from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import dynamic from 'next/dynamic';
import router from 'next/router';
import { useDownloadUrl } from '../hooks/useDownloadUrl';
import { useMutatePost } from '../hooks/useMutatePost';
import { useUploadPostImg } from '../hooks/useUploadPostImg';
import useStore from '../store';

export const PostFormMemo: FC = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const update = useStore((state) => state.updateEditedPost);
  const { createPostMutation, updatePostMutation } = useMutatePost();
  const { useMutateUploadPostImg } = useUploadPostImg();
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts'
  );
  const [position, setPosition] = useState({
    lat: 35.672909594409305,
    lng: 139.71265654633325,
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        address: editedPost.address,
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
        address: editedPost.address,
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
    if (editedPost.latlng == null) return;
    if (
      Number(editedPost.latlng.lat) !== position.lat &&
      Number(editedPost.latlng.lng) !== position.lng
    )
      update({
        ...editedPost,
        latlng: { lat: position.lat.toString(), lng: position.lng.toString() },
      });
  }, [editedPost.latlng]);

  const width = (window.innerWidth * 2) / 3;

  return (
    <Box sx={{ maxWidth: 800, width: width }} mx='auto'>
      <Button onClick={() => router.push('/search')}>投稿一覧</Button>
      <form onSubmit={submitHandler}>
        <TextInput
          mt='md'
          label='店名'
          placeholder='店名'
          value={editedPost.title}
          onChange={(e) => update({ ...editedPost, title: e.target.value })}
        />
        <TextInput
          mt='md'
          label='住所'
          placeholder='住所'
          value={editedPost.address}
          onChange={(e) => update({ ...editedPost, address: e.target.value })}
        />
        <Space m='md' />
        <MapWithNoSSR
          Marker={<Marker position={position} setPosition={setPosition} />}
        />
        <MultiSelect
          mt='md'
          onChange={(e) => update({ ...editedPost, business_day: e })}
          data={data}
          label='営業日'
          placeholder='営業日'
        />
        <Space m='md' />
        <Button
          m='auto'
          leftIcon={<IconDatabase />}
          type='submit'
          style={{ display: 'flex' }}
          loading={useMutateUploadPostImg.isLoading}
          disabled={
            useMutateUploadPostImg.isLoading ||
            !editedPost.title ||
            !editedPost.address
          }
        >
          {editedPost.id ? 'Update' : 'Create'}
        </Button>

        <Center mt='md'>
          {postUrl && (
            <Image
              src={postUrl}
              alt='Image'
              className='rounded'
              width={300}
              height={300}
            />
          )}
        </Center>
        <Center mt='md'>
          {useMutateUploadPostImg.isLoading && <Loader />}
        </Center>
        <Center mt='md'>
          <label htmlFor='post'>
            <Group position='apart'>
              <CameraIcon className='h-7 w-7 cursor-pointer text-gray-500' />
              <Text>画像追加</Text>
            </Group>
          </label>
          <input
            className='hidden'
            type='file'
            id='post'
            accept='image/*'
            onChange={async (e) => {
              await useMutateUploadPostImg.mutateAsync(e);
              e.target.value = '';
            }}
          />
        </Center>
        <Center>
          <Button onClick={() => setFullUrl('')} variant='default' color='red'>
            画像削除
          </Button>
        </Center>
      </form>
    </Box>
  );
};
export const PostForm = memo(PostFormMemo);
