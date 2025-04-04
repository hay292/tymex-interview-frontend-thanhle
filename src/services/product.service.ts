import { QueryParams } from '../types/query';
import API from './base.service';
import { Product } from '../types/product';
import { AxiosResponse } from 'axios';
export class ProductService {
  static getProducts(params: QueryParams): Promise<AxiosResponse<Product[]>> {
    return API.get('/products', { params });
  }

  static favorite(data: Product, id: number) {
    return API.put(`/products/${id}`, data );
  }
}
