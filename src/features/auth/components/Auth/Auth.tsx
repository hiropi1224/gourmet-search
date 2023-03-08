import React, { FC } from 'react';

import { useAuthView } from '@/features/auth/hooks/useAuthView';
import { AuthTemplate } from '@/features/auth/components/Auth/AuthTemplate';

export const Auth: FC = () => {
  const { form, handleSubmit, isRegister, setIsRegister } = useAuthView();

  return (
    <AuthTemplate
      form={form}
      handleSubmit={handleSubmit}
      isRegister={isRegister}
      setIsRegister={setIsRegister}
    />
  );
};
