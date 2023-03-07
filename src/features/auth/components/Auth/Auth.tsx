import React, { FC, useState } from 'react';

import { useForm } from '@mantine/form';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { AuthTemplate } from '@/features/auth/components/Auth/AuthTemplate';

export const Auth: FC = () => {
  const { loginMutation, registerMutation } = useMutateAuth();
  const [isRegister, setIsRegister] = useState(false);

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

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (isRegister) {
      registerMutation.mutate(values);
    } else {
      loginMutation.mutate(values);
    }
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
