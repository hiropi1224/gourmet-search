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
        style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Image src={imgUrl} alt='Norway' />
      </AspectRatio>
    );
  } else {
    return (
      <AspectRatio
        ratio={1 / 1}
        style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Image
          src='undefined'
          alt='With default placeholder'
          width={500}
          height={500}
          withPlaceholder
        />
      </AspectRatio>
    );
  }
};
