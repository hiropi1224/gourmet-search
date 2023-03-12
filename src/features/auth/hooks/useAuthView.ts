import { useState } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { FormType } from '@/features/auth/types';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { UseStateFuncType } from '@/types';

export const useAuthView = (): {
  form: UseFormReturnType<FormType>;
  isRegister: boolean;
  setIsRegister: UseStateFuncType<boolean>;
  handleSubmit: (values: FormType) => Promise<void>;
} => {
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

  const handleSubmit = async (values: FormType) => {
    if (isRegister) {
      registerMutation.mutate(values);
    } else {
      loginMutation.mutate(values);
    }
  };

  return { form, isRegister, setIsRegister, handleSubmit };
};
