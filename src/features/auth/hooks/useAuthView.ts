import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  FormType,
  MantineFormType,
  UseStateFuncType,
} from '@/features/auth/types';
import { useMutateAuth } from '@/hooks/useMutateAuth';

export const useAuthView = (): {
  form: MantineFormType;
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

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (isRegister) {
      registerMutation.mutate(values);
    } else {
      loginMutation.mutate(values);
    }
  };

  return { form, isRegister, setIsRegister, handleSubmit };
};
