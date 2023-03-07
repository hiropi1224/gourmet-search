import React, { FC, useEffect } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import { Session } from '@supabase/supabase-js';
import { UseMutationResult } from '@tanstack/react-query';
import { useMutatePost } from '@/hooks/useMutatePost';
import useStore from '@/store';
import { EditedPost, Post } from '@/types';
import { EditAction } from '@/common/components/EditAction';
import { PostItem } from '@/features/postList/components/PostItem';

type Props = {
  posts: Post[];
  session: Session;
  update: (payload: EditedPost) => void;
  deletePostMutation: UseMutationResult<undefined[], any, string, unknown>;
};

export const PostListTemplate: FC<Props> = ({
  posts,
  session,
  update,
  deletePostMutation,
}) => {
  return (
    <>
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
    </>
  );
};

export const PostList: FC<Omit<Props, 'update' | 'deletePostMutation'>> = ({
  posts,
  session = null,
}) => {
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();
  const initializePosition = useStore((state) => state.initializePosition);

  useEffect(() => {
    initializePosition();
  }, [initializePosition]);

  if (posts === undefined || session === null) return null;

  return (
    <PostListTemplate
      posts={posts}
      session={session}
      update={update}
      deletePostMutation={deletePostMutation}
    />
  );
};
