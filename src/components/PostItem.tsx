import { FC, memo } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Card, Text, Group } from '@mantine/core';
import { AspectImg } from '@/components/features/PostList/AspectImg';
import { useDownloadUrl } from '../hooks/useDownloadUrl';
import { useMutatePost } from '../hooks/useMutatePost';
import useStore from '../store';
import { Post } from '../types';

type PostItem = Omit<Post, 'created_at'>;
type Props = {
  postItem: PostItem;
};

export const PostItemMemo: FC<Props> = ({ postItem }) => {
  const { id, title, post_url, user_id, business_day, latlng } = postItem;
  const session = useStore((state) => state.session);
  const update = useStore((state) => state.updateEditedPost);
  const setPosition = useStore((state) => state.setPosition);
  const setRestaurantInfo = useStore((state) => state.setRestaurantInfo);
  const { deletePostMutation } = useMutatePost();

  const { fullUrl: postUrl } = useDownloadUrl(post_url, 'posts');

  const onClick = () => {
    if (latlng === null) return;
    setPosition({ lat: Number(latlng?.lat), lng: Number(latlng?.lng) });
    setRestaurantInfo({ title: title });
  };

  return (
    <>
      <Card shadow='sm' p='lg' radius='md' withBorder onClick={onClick}>
        <Card.Section>
          <AspectImg imgUrl={postUrl} />
        </Card.Section>
        <Text size='xl' weight={500}>
          {title}
        </Text>
        <Group>
          <Text size='sm'>営業日</Text>
          {business_day.length !== 0 &&
            business_day.map((day, i) => (
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
                  business_day: business_day,
                  latlng: latlng ? { lat: latlng.lat, lng: latlng.lng } : null,
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
