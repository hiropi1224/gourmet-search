export interface Root {
  results: Results;
}

export interface Results {
  api_version: string;
  results_available: number;
  results_returned: string;
  results_start: number;
  shop: Shop[];
}

export interface Shop {
  access: string;
  address: string;
  band: string;
  barrier_free: string;
  budget: Budget;
  budget_memo: string;
  capacity: number;
  card: string;
  catch: string;
  charter: string;
  child: string;
  close: string;
  coupon_urls: CouponUrls;
  course: string;
  english: string;
  free_drink: string;
  free_food: string;
  genre: Genre;
  horigotatsu: string;
  id: string;
  karaoke: string;
  ktai_coupon: number;
  large_area: LargeArea;
  large_service_area: LargeServiceArea;
  lat: number;
  lng: number;
  logo_image: string;
  lunch: string;
  middle_area: MiddleArea;
  midnight: string;
  mobile_access: string;
  name: string;
  name_kana: string;
  non_smoking: string;
  open: string;
  other_memo: string;
  parking: string;
  party_capacity: number;
  pet: string;
  photo: Photo;
  private_room: string;
  service_area: ServiceArea;
  shop_detail_memo: string;
  show: string;
  small_area: SmallArea;
  station_name: string;
  sub_genre?: SubGenre;
  tatami: string;
  tv: string;
  urls: Urls;
  wedding: string;
  wifi: string;
}

export interface Budget {
  average: string;
  code: string;
  name: string;
}

export interface CouponUrls {
  pc: string;
  sp: string;
}

export interface Genre {
  catch: string;
  code: string;
  name: string;
}

export interface LargeArea {
  code: string;
  name: string;
}

export interface LargeServiceArea {
  code: string;
  name: string;
}

export interface MiddleArea {
  code: string;
  name: string;
}

export interface Photo {
  mobile: Mobile;
  pc: Pc;
}

export interface Mobile {
  l: string;
  s: string;
}

export interface Pc {
  l: string;
  m: string;
  s: string;
}

export interface ServiceArea {
  code: string;
  name: string;
}

export interface SmallArea {
  code: string;
  name: string;
}

export interface SubGenre {
  code: string;
  name: string;
}

export interface Urls {
  pc: string;
}

export type AuthForm = {
  email: string;
  password: string;
};
