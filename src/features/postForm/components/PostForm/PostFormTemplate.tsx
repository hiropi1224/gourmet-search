import React, { FC } from 'react';
import { Button, Checkbox, Group, Text, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { IconDatabase } from '@tabler/icons';
import { UseMutationResult } from '@tanstack/react-query';
import { businessDay } from '@/features/postForm/const';
import { FormType } from '@/features/postForm/types';
import { EditedPost } from '@/types';

type Props = {
  form: UseFormReturnType<FormType>;
  handleSubmit: (values: FormType) => Promise<void>;
  editedPost: EditedPost;
  useMutateUploadPostImg: UseMutationResult<void, any, FileWithPath[], unknown>;
  children: JSX.Element;
};

export const PostFormTemplate: FC<Props> = ({
  form,
  handleSubmit,
  editedPost,
  useMutateUploadPostImg,
  children,
}) => {
  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label='店名'
          placeholder='店名'
          required
          size='md'
          {...form.getInputProps('title')}
        />
        <Checkbox.Group
          mt='md'
          size='md'
          {...form.getInputProps('businessDay')}
        >
          <Group>
            <Text>営業日</Text>
            {businessDay.map((day) => (
              <Checkbox key={day.value} value={day.value} label={day.label} />
            ))}
          </Group>
        </Checkbox.Group>
        {children}
        <Button
          m='auto'
          mt='md'
          leftIcon={<IconDatabase />}
          type='submit'
          style={{ display: 'flex' }}
          loading={useMutateUploadPostImg.isLoading}
          disabled={useMutateUploadPostImg.isLoading || !form.isValid()}
        >
          {editedPost.id ? 'Update' : 'Create'}
        </Button>
      </form>
    </>
  );
};
