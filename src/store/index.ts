import { Session } from '@supabase/supabase-js';
import create from 'zustand';
import { EditedPost } from '@/types';

type State = {
  session: Session | null;
  setSession: (payload: Session | null) => void;
  editedPost: EditedPost;
  updateEditedPost: (payload: EditedPost) => void;
  resetEditedPost: () => void;
};
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedPost: { id: '', title: '', post_url: '' },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        title: payload.title,
        post_url: payload.post_url,
      },
    }),
  resetEditedPost: () =>
    set({ editedPost: { id: '', title: '', post_url: '' } }),
}));

export default useStore;
