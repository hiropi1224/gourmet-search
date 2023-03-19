import { useState } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { FormType, UseMutationResultType } from '@/features/postList/types';
import { useMutatePost } from '@/hooks/useMutatePost';
import useStore from '@/store';
import { EditedPost, Post } from '@/types';

export const usePostListView = (
  posts: Post[]
): {
  update: (payload: EditedPost) => void;
  deletePostMutation: UseMutationResultType;
  initializePosition: VoidFunction;
  filterPost: Post[];
  form: UseFormReturnType<FormType>;
  handleSubmit: (values: FormType) => void;
} => {
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();
  const initializePosition = useStore((state) => state.initializePosition);
  const [filterPost, setFilterPost] = useState<Post[]>(posts);

  /**
   * mantine form
   */
  const form = useForm({
    initialValues: {
      businessDay: [] as string[],
    },
  });

  /**
   * フォームsubmitで受け取ったvaluesをもとにpostsをフィルタリングしてfilterPostにセットする
   * @param values
   */
  const handleSubmit = (values: FormType) => {
    setFilterPost(
      posts.filter((item) => values.businessDay.includes(item.business_day[0]))
    );
  };

  return {
    update,
    deletePostMutation,
    initializePosition,
    filterPost,
    form,
    handleSubmit,
  };
};
