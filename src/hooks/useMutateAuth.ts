import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';

export const useMutateAuth: () => {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  loginMutation: UseMutationResult<void, any, void, unknown>;
  registerMutation: UseMutationResult<void, any, void, unknown>;
} = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  };
};
