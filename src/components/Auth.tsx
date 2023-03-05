import React, { FC, useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/outline';
import {
  TextInput,
  Group,
  Button,
  Anchor,
  PasswordInput,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDatabase } from '@tabler/icons';
import { useMutateAuth } from '@/hooks/useMutateAuth';

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
    <Center style={{ flexDirection: 'column' }}>
      <ShieldCheckIcon className='h-16 w-16 text-blue-500' />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          required
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder='password'
          label='Password'
          required
          description='Must be min 6 char'
          {...form.getInputProps('password')}
        />
        <Group mt='xl' position='apart'>
          <Anchor
            component='button'
            type='button'
            size='xs'
            className='text-gray-300'
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister
              ? 'アカウントをお持ちの方はログインしてください。'
              : 'アカウントをお持ちでない方は新規登録してください。'}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            color='cyan'
            type='submit'
          >
            {isRegister ? '新規登録' : 'ログイン'}
          </Button>
        </Group>
      </form>
    </Center>
  );
};
