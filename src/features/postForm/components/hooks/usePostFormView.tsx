import { Center, Box, Button, Image } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm, UseFormReturnType } from '@mantine/form';
import { UseMutationResult } from '@tanstack/react-query';
import { FormType } from '@/features/postForm/types';
import { useDownloadUrl } from '@/hooks/useDownloadUrl';
import { useMutatePost } from '@/hooks/useMutatePost';
import { useUploadPostImg } from '@/hooks/useUploadPostImg';
import useStore from '@/store';
import { EditedPost } from '@/types';
import { ImageDrop } from '@/common/components/ImageDrop';

export const usePostFormView = (): {
  form: UseFormReturnType<FormType>;
  handleSubmit: (values: FormType) => Promise<void>;
  editedPost: EditedPost;
  postUrl: string;
  useMutateUploadPostImg: UseMutationResult<void, any, FileWithPath[], unknown>;
  UploadImage: () => '' | JSX.Element;
} => {
  // zustand store
  const editedPost = useStore((state) => state.editedPost);
  const session = useStore((state) => state.session);

  // supabase
  const { createPostMutation, updatePostMutation } = useMutatePost();
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts'
  );
  const { useMutateUploadPostImg } = useUploadPostImg();

  // mantine form
  const form = useForm({
    initialValues: {
      title: '',
      businessDay: [''],
    },
    validate: {
      title: (value) => (value.length !== 0 ? null : '入力してください'),
    },
    validateInputOnChange: true,
  });

  // submit時の処理
  const handleSubmit = async (values: FormType) => {
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: values.title,
        post_url: editedPost.post_url,
        business_day: values.businessDay,
        latlng: editedPost.latlng
          ? { lat: editedPost.latlng.lat, lng: editedPost.latlng.lng }
          : null,
      });
      setFullUrl('');
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: values.title,
        post_url: editedPost.post_url,
        business_day: values.businessDay,
        latlng: editedPost.latlng
          ? { lat: editedPost.latlng.lat, lng: editedPost.latlng.lng }
          : null,
      });
      setFullUrl('');
    }
  };

  /**
   * 画像アップロードの有無に応じたコンポーネントを返す関数
   * @returns JSX.Element
   */
  const UploadImage = () => {
    return postUrl ? (
      <Center>
        <Box>
          <Image
            src={postUrl}
            alt='Image'
            className='rounded'
            width={300}
            height={300}
          />
          <Button
            onClick={() => setFullUrl('')}
            variant='default'
            color='red'
            sx={{ width: '100%', marginTop: '1rem' }}
          >
            画像削除
          </Button>
        </Box>
      </Center>
    ) : (
      <ImageDrop
        useMutateUploadPostImg={useMutateUploadPostImg}
        loading={useMutateUploadPostImg.isLoading}
      />
    );
  };

  return {
    form,
    handleSubmit,
    editedPost,
    postUrl,
    useMutateUploadPostImg,
    UploadImage,
  };
};
