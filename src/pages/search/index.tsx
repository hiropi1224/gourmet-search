import React, { useEffect } from 'react';
import { CustomNextPage } from 'next';

import useStore from '@/store';
import { supabase } from '@/utils/supabase';
import { Auth } from '@/components/Auth';
import { PostView } from '@/components/PostView';

const Search: CustomNextPage = () => {
  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then((res) => setSession(res.data.session));
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return <>{!session ? <Auth /> : <PostView />}</>;
};

export default Search;
