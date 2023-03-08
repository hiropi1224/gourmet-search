import { UseFormReturnType } from '@mantine/form';

/**
 * useStateのset関数型定義
 */
export type UseStateFuncType<T> = React.Dispatch<React.SetStateAction<T>>;

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
