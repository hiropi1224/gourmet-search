import { IconTruckDelivery } from '@tabler/icons-react';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div className='flex items-center gap-2 border-b-2 border-[#334155]'>
      <IconTruckDelivery size={48} />
      <h1 className='text-4xl'>FoodTracker</h1>
    </div>
  );
};
