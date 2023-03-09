import React, { FC } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

type Props = {
  update: () => void;
  deletePostMutation: () => void;
  id: string;
};

export const EditAction: FC<Props> = ({ deletePostMutation }) => {
  return (
    <div className='flex p-2'>
      {/* <PencilAltIcon
        data-testid='pencil-post'
        className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
        onClick={update}
      /> */}
      <TrashIcon
        data-testid='trash-post'
        className='h-5 w-5 cursor-pointer text-blue-500'
        onClick={deletePostMutation}
      />
    </div>
  );
};
