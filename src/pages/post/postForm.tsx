import { CustomNextPage } from 'next';
import React, { useEffect } from 'react';

import useStore from '@/store';
import { supabase } from '@/utils/supabase';
import { Layout } from '@/common/component/Layout';
import { Auth } from '@/components/Auth';
import { PostForm } from '@/components/PostForm';

const Search: CustomNextPage = () => {
  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then((res) => setSession(res.data.session));
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return <Layout>{!session ? <Auth /> : <PostForm />}</Layout>;
};

export default Search;
