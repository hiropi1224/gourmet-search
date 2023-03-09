import { useState, useEffect } from 'react';
import { UseStateFuncType } from '@/types';
import { supabase } from '../utils/supabase';

export const useDownloadUrl: (
  filePath: string | undefined,
  key: 'posts'
) => {
  isLoading: boolean;
  fullUrl: string;
  setFullUrl: UseStateFuncType<string>;
} = (filePath: string | undefined, key: 'posts') => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const bucketName = key;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (filePath) {
      const download = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.storage
          .from(bucketName)
          .download(filePath);
        if (error) {
          setIsLoading(false);
          throw error;
        }
        setFullUrl(URL.createObjectURL(data!));
        setIsLoading(false);
      };
      download();
    }
  }, [filePath, bucketName]);

  return { isLoading, fullUrl, setFullUrl };
};
