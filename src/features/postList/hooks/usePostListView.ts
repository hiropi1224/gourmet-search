import { UseMutationResultType } from '@/features/postList/types';
import { useMutatePost } from '@/hooks/useMutatePost';
import useStore from '@/store';
import { EditedPost } from '@/types';

export const usePostListView = (): {
  update: (payload: EditedPost) => void;
  deletePostMutation: UseMutationResultType;
  initializePosition: VoidFunction;
} => {
  const update = useStore((state) => state.updateEditedPost);
  const { deletePostMutation } = useMutatePost();
  const initializePosition = useStore((state) => state.initializePosition);

  return { update, deletePostMutation, initializePosition };
};
