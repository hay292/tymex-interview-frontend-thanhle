export interface QueryParams {
  _page?: number;
  _limit?: number;
  category?: string;
  q?: string;
  theme?: string;
  price?: 'asc' | 'desc';
  time?: string;
  tier?: string;
  _sort?: string;
  _order?: string;
  priceRange?: [number, number];
  price_gte?: number;
  price_lte?: number;
}
