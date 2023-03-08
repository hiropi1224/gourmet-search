import React, { FC } from 'react';
import { AspectRatio, Image } from '@mantine/core';

type Props = {
  imgUrl?: string;
};

export const AspectImg: FC<Props> = ({ imgUrl = '' }) => {
  if (imgUrl) {
    return (
      <AspectRatio
        ratio={1 / 1}
        style={{
          width: 240,
          margin: 'auto',
        }}
      >
        <Image src={imgUrl} alt='Norway' />
      </AspectRatio>
    );
  } else {
    return (
      <AspectRatio
        ratio={1 / 1}
        style={{ width: 240, height: 240, margin: 'auto' }}
      >
        <Image
          src='undefined'
          alt='With default placeholder'
          height={240}
          width={240}
          withPlaceholder
        />
      </AspectRatio>
    );
  }
};
