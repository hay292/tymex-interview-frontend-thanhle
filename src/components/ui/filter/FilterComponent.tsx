import { useState } from 'react';
import { Button, Select, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './FilterComponent.css';
import resetIcon from '../../../assets/images/reset-icon.svg';
interface FilterComponentProps {
  onSearch: (filters: FilterValues) => void;
  quickSearch: (value: string) => void;
}

interface FilterValues {
  priceRange: [number, number];
  tier: string;
  theme: string;
  time: string;
  price: 'asc' | 'desc';
}

const FilterComponent = ({ onSearch, quickSearch }: FilterComponentProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0.01, 200]);
  const [tier, setTier] = useState<string>('All');
  const [theme, setTheme] = useState<string>('Halloween');
  const [time, setTime] = useState<string>('Lastest');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc'>('asc');

  // Function to handle slider value display
  const formatPriceLabel = (value: number) => {
    return `${value} ETH`;
  };

  // Reset all filters to default values
  const handleResetFilter = () => {
    setPriceRange([0.01, 200]);
    setTier('All');
    setTheme('Halloween');
    setTime('Lastest');
    setPriceSort('asc');
  };

  // Submit search with current filter values
  const handleSearch = () => {
    onSearch({
      priceRange,
      tier,
      theme,
      time,
      price: priceSort
    });
  };

  return (
    <div className='p-4 rounded-lg border border-none text-white'>
      {/* Search input at the top */}
      <div className='mb-8'>
        <div className='relative w-full'>
          <SearchOutlined className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Quick search'
            className='w-full bg-[#11111180] border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white'
            onChange={(e) => quickSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Price Range Slider */}
      <div className='mb-8'>
        <p className='mb-2 text-gray-300'>PRICE</p>
        <div className='px-1'>
          <Slider
            range
            min={0.01}
            max={200}
            step={0.01}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            tooltip={{
              formatter: (value) => formatPriceLabel(value as number),
              color: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)'
            }}
          />
          <div className='flex justify-between mt-1'>
            <span>{formatPriceLabel(priceRange[0])}</span>
            <span>{formatPriceLabel(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Tier Dropdown */}
      <div className='mb-4'>
        <p className='mb-2 text-gray-300'>TIER</p>
        <Select
          className='w-full bg-[#11111180]'
          value={tier}
          onChange={setTier}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Basic', label: 'Basic' },
            { value: 'Deluxe', label: 'Deluxe' },
            { value: 'Premium', label: 'Premium' }
          ]}
          dropdownStyle={{ background: '#222', color: 'white' }}
        />
      </div>

      {/* Theme Dropdown */}
      <div className='mb-4'>
        <p className='mb-2 text-gray-300'>THEME</p>
        <Select
          className='w-full'
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Halloween', label: 'Halloween' },
            { value: 'Light', label: 'Light' },
            { value: 'Dark', label: 'Dark' },
            { value: 'Colorful', label: 'Colorful' }
          ]}
          dropdownStyle={{ background: '#222', color: 'white' }}
        />
      </div>

      {/* Time Dropdown */}
      <div className='mb-4'>
        <p className='mb-2 text-gray-300'>TIME</p>
        <Select
          className='w-full'
          value={time}
          onChange={setTime}
          options={[
            { value: 'desc', label: 'Lastest' },
            { value: 'asc', label: 'Oldest' }
          ]}
          dropdownStyle={{ background: '#222', color: 'white' }}
        />
      </div>

      {/* Price Sorting Dropdown */}
      <div className='mb-6'>
        <p className='mb-2 text-gray-300'>PRICE</p>
        <Select
          className='w-full'
          value={priceSort}
          onChange={(value) => setPriceSort(value as 'asc' | 'desc')}
          options={[
            { value: 'asc', label: 'Low to high' },
            { value: 'desc', label: 'High to low' }
          ]}
          dropdownStyle={{ background: '#222', color: 'white' }}
        />
      </div>

      {/* Filter Actions */}
      <div className='flex space-x-8 justify-between items-center'>
        <Button
          onClick={handleResetFilter}
          className='flex items-center bg-transparent reset-button'
          icon={
            <img src={resetIcon} alt='Reset' className='text-yellow-400 mr-1' />
          }
        >
          Reset filter
        </Button>
        <Button
          type='primary'
          onClick={handleSearch}
          className='flex-1 bg-pink-500 hover:bg-pink-600 border-none rounded-md text-white search-button mr-4 h-[2.75rem]'
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
