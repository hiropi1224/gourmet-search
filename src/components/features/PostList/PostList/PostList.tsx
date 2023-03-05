import React, { FC } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import { Session } from '@supabase/supabase-js';
import { useMutatePost } from '@/hooks/useMutatePost';
import useStore from '@/store';
import { Post } from '@/types';
import { EditAction } from '@/components/features/Common/EditAction';
import { PostItem } from '@/components/features/PostList/PostItem';

type Props = {
  posts: Post[];
  session: Session;
};

export const PostList: FC<Props> = ({ posts, session = null }) => {
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();

  if (posts === undefined) return null;

  return (
    <div>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 2 },
          { minWidth: 'md', cols: 3 },
          { minWidth: 1200, cols: 4 },
        ]}
      >
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            title={post.title}
            BusinessDay={post.business_day.map((day, i) => (
              <Text key={i} size='sm'>
                {`${day}曜`}
              </Text>
            ))}
            imgUrl={post.post_url}
            position={post.latlng}
            EditAction={
              session?.user?.id === post.user_id ? (
                <>
                  <EditAction
                    update={() =>
                      update({
                        id: post.id,
                        title: post.title,
                        post_url: post.post_url,
                        business_day: post.business_day,
                        latlng: post.latlng
                          ? { lat: post.latlng.lat, lng: post.latlng.lng }
                          : null,
                      })
                    }
                    id={post.id}
                    deletePostMutation={() =>
                      deletePostMutation.mutate(post.id)
                    }
                  />
                </>
              ) : (
                <></>
              )
            }
          />
        ))}
      </SimpleGrid>
    </div>
  );
};
