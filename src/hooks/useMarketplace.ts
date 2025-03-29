import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Product } from '../type/Product';
const fetchProducts = async (page = 1, limit = 20): Promise<Product[]> => {
  const response = await fetch(
    `http://localhost:5005/products?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useMarketplace = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => fetchProducts(page, limit)
  });

  return {
    items: data || [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    page,
    limit,
    setPage,
    setLimit
  };
};
