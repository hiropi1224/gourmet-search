import React, { FC } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/outline';
import {
  TextInput,
  Group,
  Button,
  Anchor,
  PasswordInput,
  Center,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconDatabase } from '@tabler/icons';
import { FormType } from '@/features/auth/types';
import { UseStateFuncType } from '@/types';

type Props = {
  form: UseFormReturnType<FormType>;
  handleSubmit: (values: FormType) => Promise<void>;
  setIsRegister: UseStateFuncType<boolean>;
  isRegister: boolean;
  isLoading: boolean;
};

export const AuthTemplate: FC<Props> = ({
  form,
  handleSubmit,
  setIsRegister,
  isRegister,
  isLoading,
}) => {
  return (
    <Center style={{ flexDirection: 'column' }}>
      <ShieldCheckIcon className='h-16 w-16 text-blue-500' />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          required
          label='Email'
          placeholder='your@email.com'
          size='md'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder='password'
          label='Password'
          required
          size='md'
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
            loading={isLoading}
          >
            {isRegister ? '新規登録' : 'ログイン'}
          </Button>
        </Group>
      </form>
    </Center>
  );
};
