import { useForm, UseFormReturnType } from '@mantine/form';
import { FormType } from '@/features/search/types';
import { Results, Root, UseStateFuncType } from '@/types';

export const useSearchFormView = (
  setGourmet: UseStateFuncType<Results | undefined>,
  setStatus: UseStateFuncType<boolean>
): {
  form: UseFormReturnType<FormType, (values: FormType) => FormType>;
  onSubmit: (values: FormType) => Promise<void>;
} => {
  const form = useForm<FormType>({
    initialValues: {
      keyword: '',
      isLunch: false,
      order: '4',
    },
    validate: {
      keyword: (value) => (value.length < 1 ? '入力してください' : null),
    },
  });

  const onSubmit = async (values: {
    keyword: string;
    isLunch: boolean;
    order: string;
  }) => {
    const params = {
      keyword: values.keyword,
      lunch: values.isLunch ? '1' : '0',
      order: values.order,
    };

    const query = new URLSearchParams(params);
    setStatus(true);
    const request = async () => {
      const res = await fetch(`/api/search?${query}`);
      const data: Root = await res.json();

      setGourmet(data.results);
    };

    await request();
    setStatus(false);
    values.keyword = '';
    values.isLunch = false;
  };

  return { form, onSubmit };
};
