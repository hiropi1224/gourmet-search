import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

export const useMutateAuth = (): {
  loginMutation: UseMutationResult<
    void,
    any,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  registerMutation: UseMutationResult<
    void,
    any,
    {
      email: string;
      password: string;
    },
    unknown
  >;
} => {
  const loginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const registerMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
      onSuccess: () => {
        alert(
          '登録が完了しました。入力されたメールアドレス宛に承認メールを送信しましたのでご確認ください。'
        );
      },
    }
  );

  return {
    loginMutation,
    registerMutation,
  };
};
