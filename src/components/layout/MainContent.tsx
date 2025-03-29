import { Button } from 'antd';
import { useMarketplace } from '../../hooks/useMarketplace';
import FilterByType from '../ui/filter/FilterByType';
import FilterComponent from '../ui/filter/FilterComponent';
import CardItem from '../ui/CardItem';
import bottomLine from '../../assets/images/bottom-line.svg';

interface FilterValues {
  priceRange: [number, number];
  tier: string;
  theme: string;
  time: string;
  priceSort: string;
}

export default function MainContent() {
  const { items, loading, error } = useMarketplace();
  console.log(items, loading, error);
  // Function to handle search/filter submission
  const handleSearch = (filters: FilterValues) => {
    console.log('Applied filters:', filters);
    // Implement search logic here
  };

  const handleFilterChange = (type: string) => {
    console.log('Selected filter:', type);
    // Implement filter logic here
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
            <FilterComponent onSearch={handleSearch} />
          </div>

          {/* Main content area */}
          <div className='flex-1 overflow-x-auto'>
            {/*Main content here */}
            <div className='rounded-lg p-4 text-white'>
              <FilterByType onFilterChange={handleFilterChange} />
              <div className='flex flex-row flex-wrap gap-8 mt-6 h-[43.75rem] overflow-y-auto'>
                {items.map((item) => (
                  <CardItem key={item.id} {...item} />
                ))}
              </div>
              {/* View More Button */}
              <div className='mt-15 text-center'>
                <Button
                  type='primary'
                  className='max-w-[20rem] w-full h-[4.3rem] bg-[linear-gradient(91.47deg,#DA458F_-6%,#DA34DD_113.05%)] hover:bg-[linear-gradient(91.47deg,#DA458F_-10%,#DA34DD_113.05%)] border-0 rounded-md font-medium text-white shadow-md transition-all'
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
