import React, { FC } from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import { supabase } from '@/utils/supabase';

export const PostList: FC = () => {
  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div>
      <LogoutIcon
        data-testid='logout'
        className='my-6 h-6 w-6 cursor-pointer text-blue-500'
        onClick={signOut}
      />
    </div>
  );
};
