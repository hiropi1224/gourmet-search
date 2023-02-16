import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

export const notification = (): void => {
  showNotification({
    message: '登録成功',
    autoClose: 5000,
    icon: <IconCheck size={20} />,
  });
};
