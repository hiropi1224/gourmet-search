import { UseMutationResult } from '@tanstack/react-query';

export type LatLng = {
  lat: string;
  lng: string;
};

export type UseMutationResultType = UseMutationResult<
  undefined[],
  unknown,
  string,
  unknown
>;

export type FormType = {
  businessDay: string[];
};
