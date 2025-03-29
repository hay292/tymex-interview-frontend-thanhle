import { QueryParams } from '../type/query';
import API from './base.service';
import { Product } from '../type/product';

export class ProductService {
  static getProducts(params: QueryParams): Promise<Product[]> {
    return API.get('/products', { params });
  }
}
