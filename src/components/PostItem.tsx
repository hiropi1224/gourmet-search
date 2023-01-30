import { FC, memo } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Loader } from '@mantine/core';
import Image from 'next/image';
import { useDownloadUrl } from '../hooks/useDownloadUrl';
import { useMutatePost } from '../hooks/useMutatePost';
import useStore from '../store';
import { Post } from '../types';

export const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  post_url,
  user_id,
}) => {
  const session = useStore((state) => state.session);
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();

  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts'
  );

  return (
    <>
      <li className='w-80'>
        <div className='my-3 w-full border border-dashed border-gray-400' />
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <span className='ml-2 font-bold'>{title}</span>
          </div>
          {session?.user?.id === user_id && (
            <div className='flex pr-4'>
              <PencilAltIcon
                data-testid='pencil-post'
                className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
                onClick={() => {
                  update({
                    id: id,
                    title: title,
                    post_url: post_url,
                  });
                }}
              />
              <TrashIcon
                data-testid='trash-post'
                className='h-5 w-5 cursor-pointer text-blue-500'
                onClick={() => {
                  deletePostMutation.mutate(id);
                }}
              />
            </div>
          )}
        </div>
        <div className='my-3 flex justify-center'>
          {postUrl && (
            <Image
              src={postUrl}
              alt='Image'
              className='rounded-lg'
              width={300}
              height={300}
            />
          )}
        </div>
        <div className='my-3 flex justify-center'>
          {isLoadingPost && <Loader />}
        </div>
      </li>
    </>
  );
};
export const PostItem = memo(PostItemMemo);
