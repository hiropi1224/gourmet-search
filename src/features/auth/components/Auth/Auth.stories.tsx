/* eslint-disable no-console */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthView } from '@/features/auth/hooks/useAuthView';
import { AuthTemplate } from '@/features/auth/components/Auth/AuthTemplate';
const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
export default {
  title: 'Auth/AuthTemplate',
  component: AuthTemplate,
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={mockedQueryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} as ComponentMeta<typeof AuthTemplate>;

export const AuthForm: ComponentStory<typeof AuthTemplate> = () => {
  const { form, isRegister, setIsRegister } = useAuthView();

  const _sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (values: { email: string; password: string }) => {
    await _sleep(2000);
    console.log(values);
  };

  return (
    <AuthTemplate
      form={form}
      handleSubmit={handleSubmit}
      isRegister={isRegister}
      setIsRegister={setIsRegister}
    />
  );
};
