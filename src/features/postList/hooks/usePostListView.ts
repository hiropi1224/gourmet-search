import { useState } from 'react';
import { UseMutationResultType } from '@/features/postList/types';
import { useMutatePost } from '@/hooks/useMutatePost';
import useStore from '@/store';
import { EditedPost, Post, UseStateFuncType } from '@/types';

export const usePostListView = (
  posts: Post[]
): {
  update: (payload: EditedPost) => void;
  deletePostMutation: UseMutationResultType;
  initializePosition: VoidFunction;
  setFilterDay: UseStateFuncType<string[]>;
  filterPost: Post[];
} => {
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();
  const initializePosition = useStore((state) => state.initializePosition);
  const [filterDay, setFilterDay] = useState<string[]>([
    '月',
    '火',
    '水',
    '木',
    '金',
    '',
  ]);

  const filterPosts = (obj: Post[]) => {
    return obj.filter((item) => filterDay.includes(item.business_day[0]));
  };
  const filterPost = filterPosts(posts);

  return {
    update,
    deletePostMutation,
    initializePosition,
    setFilterDay,
    filterPost,
  };
};
