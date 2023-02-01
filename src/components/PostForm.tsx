import { FormEvent, FC, memo } from 'react';
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
} from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        address: editedPost.address,
        business_day: editedPost.business_day,
      });
      setFullUrl('');
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        address: editedPost.address,
        business_day: editedPost.business_day,
      });
      setFullUrl('');
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx='auto'>
      <form onSubmit={submitHandler}>
        <TextInput
          mt='md'
          label='店名'
          placeholder='店名'
          value={editedPost.title}
          onChange={(e) => update({ ...editedPost, title: e.target.value })}
        />
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
