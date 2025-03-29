import FilterByType from '../FilterByType';
import FilterComponent from '../FilterComponent';

interface FilterValues {
  priceRange: [number, number];
  tier: string;
  theme: string;
  time: string;
  priceSort: string;
}

export default function Layout() {
  // Function to handle search/filter submission
  const handleSearch = (filters: FilterValues) => {
    console.log('Applied filters:', filters);
    // Implement your search logic here
  };

  const handleFilterChange = (type: string) => {
    console.log('Selected filter:', type);
    // Implement your filter logic here
  };

  return (
    <div
      className='w-full h-full flex-1 bg-[#00000033] bg-[url(assets/images/main-background.svg)] 
    bg-blend-multiply bg-cover bg-center p-4 pl-[10rem] pt-[7rem]'
    >
      <div className="w-full">
        <div className="flex flex-row gap-4">
          {/* Sidebar with filter */}
          <div className='w-[29.25%]'>
            <FilterComponent onSearch={handleSearch} />
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-x-auto">
            {/* Your main content here */}
            <div className="rounded-lg p-4 text-white">
             <FilterByType onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
