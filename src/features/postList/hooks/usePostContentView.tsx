import { Badge } from '@mantine/core';
import { LatLng } from '@/features/postList/types';
import { useDownloadUrl } from '@/hooks/useDownloadUrl';
import useStore from '@/store';

/**
 * PostContent用のカスタムHooks
 * @param postUrl
 * @param businessDay
 * @param position
 * @returns { BusinessDay, image, onClickCard }
 */
export const usePostContentView = (
  title: string,
  postUrl: string,
  businessDay: string[],
  position: LatLng | null
): {
  BusinessDay: JSX.Element | JSX.Element[];
  image: string;
  onClickCard: () => void;
} => {
  const { fullUrl: image } = useDownloadUrl(postUrl, 'posts');
  const setPosition = useStore((state) => state.setPosition);
  const setRestaurantInfo = useStore((state) => state.setRestaurantInfo);

  /**
   * カード押下時に経緯度をストアに保存する
   */
  const onClickCard = () => {
    if (position === null) return;
    setPosition({ lat: Number(position.lat), lng: Number(position.lng) });
    setRestaurantInfo({ title: title });
  };

  // 営業日表示用のJSX.Element生成
  const BusinessDay = businessDay.map((day) => (
    <Badge color={'gray'} key={day}>
      {day !== '' ? day : '未入力'}
    </Badge>
  ));

  return { BusinessDay, image, onClickCard };
};
