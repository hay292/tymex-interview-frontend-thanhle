import { Drawer } from 'antd';
import './styles.css';
import FilterByCategory from '@components/ui/filter/FilterByCategory';
import FilterComponent from '@components/ui/filter/FilterComponent';
import CardItem from '@components/common/Card';
import SkeletonProductList from '@components/ui/skeleton/SkeletonProductList';
import CustomButton from '@components/common/Button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductService } from '@services/product.service';
import { QueryParams } from '@/types/query';
import { useMemo, useState } from 'react';
import { Product } from '@/types/product';
import { useDebounce } from '@hooks/useDebounce';
import {
  CloseOutlined,
  FilterOutlined,
  SearchOutlined,
  InboxOutlined
} from '@ant-design/icons';
import bottomLine from '@assets/images/bottom-line.svg';

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
    _sort: !query.price && !query.time ? undefined : `${query.price ? 'price' : ''}${query.time ? ',createdAt' : ''}`,
    _order: !query.price && !query.time ? undefined : `${query.price ? query.price : ''}${query.time ? `,${query.time}` : ''}`
  };

  if (query.priceRange) {
    params.price_gte = query.priceRange[0];
    params.price_lte = query.priceRange[1];
  }

  return ProductService.getProducts(params);
};

const Home = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [quickSearch, setQuickSearch] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 200],
    tier: undefined,
    theme: undefined,
    time: undefined,
    price: undefined
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const debouncedSearch = useDebounce(quickSearch, 500);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
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
      refetchInterval: 60000
    });

  const products = useMemo<Product[]>(() => {
    if (!data) return [];
    return data.pages.reduce((current, page) => {
      return [...current, ...(page?.data || [])];
    }, [] as Product[]);
  }, [data]);

  const handleSearch = (filters: FilterValues) => {
    setFilters(filters);
    setFilterDrawerOpen(false);
  };

  const handleQuickSearch = (value: string) => {
    setQuickSearch(value);
  };

  return (
    <div
      className='w-full h-full flex-1 bg-[#00000033] bg-[url(assets/images/main-background.webp)] 
      bg-blend-multiply bg-cover bg-center'
    >
      <div className='container mx-auto px-5 pt-10 md:pt-16 xl:pt-[7.5rem]'>
        <div className='flex flex-row gap-10'>
          {/* Sidebar with filter - visible only on non-mobile screens */}
          <div className='hidden xl:block w-[23.25rem]'>
            <FilterComponent
              onSearch={handleSearch}
              quickSearch={setQuickSearch}
            />
          </div>

          {/* Main content area */}
          <div className='flex-1 w-full overflow-x-auto'>
            {/* Mobile search and filter section */}
            <div className='xl:hidden mb-4'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='relative flex-1'>
                  <SearchOutlined className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                  <input
                    placeholder='Quick search'
                    className='w-full h-[2.75rem] outline-none bg-[#11111180] border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white'
                    onChange={(e) => handleQuickSearch(e.target.value)}
                  />
                </div>
                <CustomButton
                  type='primary'
                  icon={<FilterOutlined />}
                  onClick={() => setFilterDrawerOpen(true)}
                  width='44px'
                />
              </div>
            </div>

            {/*Main content here */}
            <div className='rounded-lg text-white pb-4'>
              <FilterByCategory
                onFilterChange={(type) =>
                  setCategory(type === 'All' ? undefined : type)
                }
              />
              <div className={`products-list grid grid-cols-[repeat(auto-fit,minmax(267px,1fr))] 
                justify-items-center lg:justify-items-start overflow-y-auto
                 ${hasNextPage && products.length ? 'h-[74.5rem]' : 'h-[50rem]'}`}>
                {isLoading && !products.length ? (
                  <SkeletonProductList count={12} />
                ) : products.length > 0 ? (
                  products.map((item) => <CardItem key={item.id} {...item} />)
                ) : (
                  <div className='w-full text-center py-10'>
                    <div className='flex flex-col items-center justify-center py-10'>
                      <InboxOutlined
                        style={{
                          fontSize: '3rem',
                          color: 'rgba(255, 255, 255, 0.2)'
                        }}
                      />
                      <p className='text-gray-400 mt-4'>
                        No data found matching your criteria.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* View More Button */}
            {hasNextPage && products.length && (
              <div className='flex items-center justify-center'>
                <CustomButton
                  type='primary'
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className='w-full md:h-[4.375rem] mb-[3.375rem]'
                  loading={isFetchingNextPage}
                  width='326px'
                >
                  View more
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <div className='w-full'>
        <img src={bottomLine} alt='bottom-line' className='w-full' />
      </div>
      {/* Filter Drawer for Mobile */}
      <Drawer
        placement='right'
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        closeIcon={
          <CloseOutlined
            style={{ color: 'white', fontSize: '18px', outline: 'none' }}
          />
        }
        width={300}
        bodyStyle={{ padding: 0, background: '#1A1A1D', paddingTop: '2rem', paddingLeft: '1rem', paddingRight: '1rem'  }}
        headerStyle={{
          background: '#1A1A1D',
          color: 'white',
          borderBottom: '1px solid #333',
        }}
        className='filter-drawer'
      >
        <FilterComponent onSearch={handleSearch} quickSearch={setQuickSearch} />
      </Drawer>
    </div>
  );
};

export default Home;
