import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchItem } from './SearchItem';

export default {
  title: 'Search/SearchItem',
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: ComponentStory<typeof SearchItem> = (args) => (
  <SearchItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  shop: {
    access: '【表参道駅から徒歩7分】　',
    address: '東京都港区南青山６-2-3ファイン青山1F',
    band: '不可',
    barrier_free: 'なし',
    budget: {
      average: '',
      code: 'B008',
      name: '4001～5000円',
    },
    budget_memo: '17時以降：サービス料10％（アラカルト利用時は席料500円）',
    capacity: 44,
    card: '利用可',
    catch: 'ヘルシーで美容・健康に◎ 豊富なヴィーガンメニュー',
    charter: '貸切不可 ：お気軽にご相談下さい♪',
    child: 'お子様連れ歓迎',
    close: 'なし',
    coupon_urls: {
      pc: 'https://www.hotpepper.jp/strJ002648398/map/?vos=nhppalsa000016',
      sp: 'https://www.hotpepper.jp/strJ002648398/scoupon/?vos=nhppalsa000016',
    },
    course: 'あり',
    english: 'なし',
    free_drink: 'なし',
    free_food: 'なし',
    genre: {
      catch: '薬膳と野菜　身体に優しい創作中華を愉しむ',
      code: 'G007',
      name: '中華',
    },
    horigotatsu: 'なし',
    id: 'J002648398',
    karaoke: 'なし',
    ktai_coupon: 0,
    large_area: {
      code: 'Z011',
      name: '東京',
    },
    large_service_area: {
      code: 'SS10',
      name: '関東',
    },
    lat: 35.6610911603,
    lng: 139.7150044482,
    logo_image: 'https://imgfp.hotp.jp/IMGH/70/82/P040427082/P040427082_69.jpg',
    lunch: 'あり',
    middle_area: {
      code: 'Y035',
      name: '原宿・青山・表参道',
    },
    midnight: '営業していない',
    mobile_access: '【表参道駅から徒歩7分】 ',
    name: 'vegan veggie 嫦娥　じょうが　表参道店',
    name_kana: 'びーがんべじーじょうがおもてさんどうてん',
    non_smoking: '全面禁煙',
    open: '月: 11:30～15:00 （料理L.O. 14:00 ドリンクL.O. 14:00）火～日、祝日、祝前日: 11:30～14:00 （料理L.O. 13:30 ドリンクL.O. 13:30）17:00～21:00 （料理L.O. 20:30 ドリンクL.O. 20:30）',
    other_memo: '',
    parking: 'なし ：近隣のコインパーキングをご利用下さい。',
    party_capacity: 0,
    pet: '不可',
    photo: {
      mobile: {
        l: 'https://imgfp.hotp.jp/IMGH/71/35/P040427135/P040427135_168.jpg',
        s: 'https://imgfp.hotp.jp/IMGH/71/35/P040427135/P040427135_100.jpg',
      },
      pc: {
        l: 'https://imgfp.hotp.jp/IMGH/71/35/P040427135/P040427135_238.jpg',
        m: 'https://imgfp.hotp.jp/IMGH/71/35/P040427135/P040427135_168.jpg',
        s: 'https://imgfp.hotp.jp/IMGH/71/35/P040427135/P040427135_58_s.jpg',
      },
    },
    private_room: 'なし',
    service_area: {
      code: 'SA11',
      name: '東京',
    },
    shop_detail_memo: '多数のノンアルコールドリンクを取り揃えています。',
    show: 'なし',
    small_area: {
      code: 'X110',
      name: '表参道',
    },
    station_name: '表参道',
    sub_genre: {
      code: 'G014',
      name: 'カフェ・スイーツ',
    },
    tatami: 'なし',
    tv: 'なし',
    urls: {
      pc: 'https://www.hotpepper.jp/strJ002648398/?vos=nhppalsa000016',
    },
    wedding: '',
    wifi: 'あり',
  },
};
