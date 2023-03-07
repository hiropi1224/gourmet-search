/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthTemplate } from '@/features/auth/components/Auth/AuthTemplate';

export default {
  title: 'Auth/AuthTemplate',
  component: AuthTemplate,
} as ComponentMeta<typeof AuthTemplate>;

export const AuthForm: ComponentStory<typeof AuthTemplate> = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6 ? 'Name must have at least 6 letters' : null,
    },
    validateInputOnChange: true,
  });
  const [isRegister, setIsRegister] = useState(false);
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
