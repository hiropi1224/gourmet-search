import React, { FC, FormEvent, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import {
  Alert,
  TextInput,
  PasswordInput,
  Group,
  Anchor,
  Button,
  Center,
} from '@mantine/core';
import { IconDatabase } from '@tabler/icons';
import { useMutateAuth } from '@/hooks/useMutateAuth';

export const Auth: FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegister) {
      registerMutation.mutate();
    } else {
      loginMutation.mutate();
    }
  };

  return (
    <Center style={{ flexDirection: 'column' }}>
      <ShieldCheckIcon className='h-16 w-16 text-blue-500' />
      {error && (
        <Alert
          my='md'
          variant='filled'
          icon={<ExclamationCircleIcon />}
          title='Authorization Error'
          color='red'
          radius='md'
        >
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextInput
          mt='md'
          id='email'
          label='Email*'
          placeholder='example@gmail.com'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordInput
          mt='md'
          id='password'
          placeholder='password'
          label='Password*'
          description='Must be min 5 char'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Group mt='xl' position='apart'>
          <Anchor
            component='button'
            type='button'
            size='xs'
            className='text-gray-300'
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister
              ? 'Have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            leftIcon={<IconDatabase size={14} />}
            color='cyan'
            type='submit'
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Center>
  );
};
