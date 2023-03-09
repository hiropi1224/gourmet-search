import { FC } from 'react';
import { SimpleGrid } from '@mantine/core';
import { Session } from '@supabase/supabase-js';
import { UseMutationResultType } from '@/features/postList/types';
import { EditedPost, Post } from '@/types';
import { EditAction } from '@/common/components/EditAction';
import { PostContent } from '@/features/postList/components/PostContent';

type Props = {
  posts: Post[];
  session: Session;
  update: (payload: EditedPost) => void;
  deletePostMutation: UseMutationResultType;
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
          <PostContent
            key={post.id}
            title={post.title}
            postUrl={post.post_url}
            position={post.latlng}
            businessDay={post.business_day}
          >
            {session?.user?.id === post.user_id ? (
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
                  deletePostMutation={() => deletePostMutation.mutate(post.id)}
                />
              </>
            ) : (
              <></>
            )}
          </PostContent>
        ))}
      </SimpleGrid>
    </>
  );
};
