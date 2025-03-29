import { Button } from 'antd';
import FilterByCategory from '../ui/filter/FilterByCategory';
import FilterComponent from '../ui/filter/FilterComponent';
import CardItem from '../ui/CardItem';
import bottomLine from '../../assets/images/bottom-line.svg';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '../../services/product.service';
import { QueryParams } from '../../type/query';
import { useMemo } from 'react';
import { useState } from 'react';
import { Product } from '../../type/product';
import { useDebounce } from '../../hooks/useDebounce';

interface FilterValues {
  priceRange: [number, number];
  tier?: string;
  theme?: string;
  time?: string;
  price?: 'asc' | 'desc';
}

const getProducts = (query: QueryParams) => {
  const params: QueryParams = {
    _page: query._page ?? 1,
    _limit: query._limit ?? 20,
    category: query.category,
    q: query.q ?? undefined,
    theme: query.theme === 'All' ? undefined : query.theme,
    tier: query.tier === 'All' ? undefined : query.tier,
    _sort: `${query.price ? 'price' : undefined}${query.time ? ',createdAt' : undefined}`,
    _order: `${query.price ? query.price : undefined}${query.time ? `,${query.time}` : undefined}`
  };

  if (query.priceRange) {
    params.price_gte = query.priceRange[0];
    params.price_lte = query.priceRange[1];
  }

  return ProductService.getProducts(params);
};

export default function MainContent() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [quickSearch, setQuickSearch] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 200],
    tier: undefined,
    theme: undefined,
    time: undefined,
    price: undefined
  });
  const debouncedSearch = useDebounce(quickSearch, 500);
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['product', category, debouncedSearch, filters],
    queryFn: ({ pageParam = 1 }) => {
      return getProducts({
        _page: pageParam,
        _limit: 20,
        category,
        q: debouncedSearch,
        theme: filters.theme === 'All' ? undefined : filters.theme,
        tier: filters.tier === 'All' ? undefined : filters.tier,
        price: filters.price,
        time: filters.time,
        priceRange: filters.priceRange
      });
    },
    initialPageParam: 1,
    getNextPageParam: (_, _pages) => {
      if (_pages.length === 50) return undefined;
      return _pages.length + 1;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 60000 //  all queries will continuously refetch at this frequency in milliseconds
  });

  const products = useMemo<Product[]>(() => {
    if (!data) return [];
    let rs: Product[] = [];
    return data?.pages?.reduce((current: any, page: any) => {
      rs = [...current, ...page?.data];
      return rs;
    }, rs);
  }, [data]);

  // Function to handle search/filter submission
  const handleSearch = (filters: FilterValues) => {
    setFilters(filters);
  };

  return (
    <div
      className='w-full h-full flex-1 bg-[#00000033] bg-[url(assets/images/main-background.svg)] 
  bg-blend-multiply bg-cover bg-center'
    >
      <div className='w-full p-4 pl-[10rem] pt-[7rem]'>
        <div className='flex flex-row gap-4'>
          {/* Sidebar with filter */}
          <div className='w-[29.25%]'>
            <FilterComponent
              onSearch={handleSearch}
              quickSearch={setQuickSearch}
            />
          </div>

          {/* Main content area */}
          <div className='flex-1 overflow-x-auto'>
            {/*Main content here */}
            <div className='rounded-lg p-4 text-white'>
              <FilterByCategory
                onFilterChange={(type) =>
                  setCategory(type === 'All' ? undefined : type)
                }
              />
              <div className='flex flex-row flex-wrap gap-8 mt-6 h-[43.75rem] overflow-y-auto'>
                {products.map((item) => (
                  <CardItem key={item.id} {...item} />
                ))}
              </div>
              {/* View More Button */}
              <div className='mt-15 text-center'>
                <Button
                  type='primary'
                  onClick={() => {
                    fetchNextPage();
                  }}
                  disabled={!hasNextPage || isLoading}
                  className='max-w-[20rem] w-full h-[4.3rem] bg-[linear-gradient(91.47deg,#DA458F_-6%,#DA34DD_113.05%)] hover:bg-[linear-gradient(91.47deg,#DA458F_-10%,#DA34DD_113.05%)] border-0 rounded-md font-medium text-white shadow-md transition-all outline-none'
                >
                  View more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image on the bottom */}
      <img src={bottomLine} alt='bottom-line' className='w-full h-auto' />
    </div>
  );
}
