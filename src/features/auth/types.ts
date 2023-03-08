import { UseFormReturnType } from '@mantine/form';

/**
 * mantine.form型定義
 */
export type MantineFormType = UseFormReturnType<FormType>;

/**
 * mantine.formのuseForm型定義
 */
export type FormType = {
  email: string;
  password: string;
};
