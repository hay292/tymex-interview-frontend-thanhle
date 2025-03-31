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
import { CloseOutlined, FilterOutlined, SearchOutlined, InboxOutlined } from '@ant-design/icons';

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
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
      <div className='w-full p-4 xl:pl-[10rem] pt-[7rem]'>
        <div className='flex flex-row gap-4'>
          {/* Sidebar with filter - visible only on non-mobile screens */}
          <div className="hidden xl:block w-[23.25rem]">
            <FilterComponent
              onSearch={handleSearch}
              quickSearch={setQuickSearch}
            />
          </div>

          {/* Main content area */}
          <div className='flex-1 w-full overflow-x-auto'>
            {/* Mobile search and filter section */}
            <div className="xl:hidden mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-1">
                  <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    placeholder="Quick search"
                    className="w-full h-[2.75rem] outline-none bg-[#11111180] border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white"
                    onChange={(e) => handleQuickSearch(e.target.value)}
                  />
                </div>
                <CustomButton 
                  type="primary"
                  icon={<FilterOutlined />}
                  onClick={() => setFilterDrawerOpen(true)}
                  className="w-[2.75rem]"
                />
              </div>
            </div>

            {/*Main content here */}
            <div className='rounded-lg p-4 text-white'>
              <FilterByCategory
                onFilterChange={(type) =>
                  setCategory(type === 'All' ? undefined : type)
                }
              />
              <div className='flex flex-row flex-wrap -mx-2 mt-6 h-[100rem] overflow-y-auto products-list'>
                {isLoading && !products.length ? (
                  <SkeletonProductList count={16} />
                ) : products.length > 0 ? (
                  products.map((item) => (
                    <CardItem key={item.id} {...item} />
                  ))
                ) : (
                  <div className="w-full text-center py-10">
                    <div className="flex flex-col items-center justify-center py-10">
                      <InboxOutlined style={{ fontSize: '3rem', color: 'rgba(255, 255, 255, 0.2)' }} />
                      <p className="text-gray-400 mt-4">No data found matching your criteria.</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Loading more indicator */}
              {isFetchingNextPage && (
                <div className="text-center py-5">
                  <SkeletonProductList count={4} />
                </div>
              )}
              {/* View More Button */}
              {hasNextPage && (
                <div className='flex items-center justify-center'>
                  <CustomButton
                    type='primary'
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className='max-w-[20rem] w-full md:h-[4.375rem] my-8'
                    loading={isFetchingNextPage}
                  >
                    View more
                  </CustomButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Drawer for Mobile */}
      <Drawer
        placement="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        closeIcon={<CloseOutlined style={{ color: "white", fontSize: "18px", outline: "none" }} />}
        width={300}
        bodyStyle={{ padding: 0, background: "#1A1A1D" }}
        headerStyle={{ background: "#1A1A1D", color: "white", borderBottom: "1px solid #333" }}
        className="filter-drawer"
      >
        <FilterComponent
          onSearch={handleSearch}
          quickSearch={setQuickSearch}
        />
      </Drawer>
    </div>
  );
};

export default Home; 