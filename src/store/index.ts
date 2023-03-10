import { Session } from '@supabase/supabase-js';
import create from 'zustand';
import { EditedPost } from '@/types';

type State = {
  isDark: boolean;
  changeIsDark: (payload: boolean) => void;
  session: Session | null;
  setSession: (payload: Session | null) => void;
  editedPost: EditedPost;
  updateEditedPost: (payload: EditedPost) => void;
  resetEditedPost: () => void;
  setPosition: (payload: { lat: number; lng: number }) => void;
  position: {
    lat: number;
    lng: number;
  };
  initializePosition: () => void;
  setRestaurantInfo: (payload: { title: string }) => void;
  restaurantInfo: {
    title: string;
  };
};
const useStore = create<State>((set) => ({
  isDark: true,
  changeIsDark: (payload) => set({ isDark: payload }),
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedPost: {
    id: '',
    title: '',
    post_url: '',
    business_day: [''],
    latlng: { lat: '', lng: '' },
  },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        title: payload.title,
        post_url: payload.post_url,
        business_day: payload.business_day,
        latlng: payload.latlng
          ? { lat: payload.latlng.lat, lng: payload.latlng.lng }
          : null,
      },
    }),
  resetEditedPost: () =>
    set({
      editedPost: {
        id: '',
        title: '',
        post_url: '',
        business_day: [''],
        latlng: { lat: '', lng: '' },
      },
    }),

  setPosition: (payload) =>
    set({
      position: {
        lat: payload.lat,
        lng: payload.lng,
      },
    }),
  initializePosition: () =>
    set({
      position: {
        lat: 35.672909594409305,
        lng: 139.71265654633325,
      },
    }),

  setRestaurantInfo: (payload) =>
    set({
      restaurantInfo: {
        title: payload.title,
      },
    }),

  position: {
    lat: 35.672909594409305,
    lng: 139.71265654633325,
  },

  restaurantInfo: {
    title: '',
  },
}));

export default useStore;
