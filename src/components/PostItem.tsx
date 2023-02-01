import { FC, memo } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import {
  Image as MantineImage,
  Card,
  Text,
  AspectRatio,
  Group,
} from '@mantine/core';
import { useDownloadUrl } from '../hooks/useDownloadUrl';
import { useMutatePost } from '../hooks/useMutatePost';
import useStore from '../store';
import { Post } from '../types';

export const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  post_url,
  user_id,
  address,
  business_day,
}) => {
  const session = useStore((state) => state.session);
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();

  const { fullUrl: postUrl } = useDownloadUrl(post_url, 'posts');

  const imgArea = () => {
    if (postUrl) {
      return (
        <AspectRatio
          ratio={1 / 1}
          style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <MantineImage src={postUrl} alt='Norway' />
        </AspectRatio>
      );
    } else {
      return (
        <AspectRatio
          ratio={1 / 1}
          style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <MantineImage
            src='undefined'
            alt='With default placeholder'
            width={500}
            height={500}
            withPlaceholder
          />
        </AspectRatio>
      );
    }
  };

  return (
    <>
      <Card shadow='sm' p='lg' radius='md' withBorder>
        <Card.Section>{imgArea()}</Card.Section>
        <Text size='xl' weight={500}>
          {title}
        </Text>
        <Text size='sm'>{`住所: ${address}`}</Text>
        <Group>
          <Text size='sm'>営業日</Text>
          {business_day.map((day, i) => (
            <Text key={i} size='sm'>
              {`${day}曜`}
            </Text>
          ))}
        </Group>
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
                  address: address,
                  business_day: business_day,
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
      </Card>
    </>
  );
};
export const PostItem = memo(PostItemMemo);
