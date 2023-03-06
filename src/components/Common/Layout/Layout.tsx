import React, { FC } from 'react';
import { Container } from '@mantine/core';
import { CustomHeader } from './Header';
type Props = {
  children: JSX.Element;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <CustomHeader />
      <Container
        min-height='100vh'
        style={{ flex: '1 0 auto', maxWidth: '80rem' }}
      >
        {children}
      </Container>
    </>
  );
};
