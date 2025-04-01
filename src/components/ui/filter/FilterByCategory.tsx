import { useState, useRef } from 'react';
import { Button } from 'antd';
import './FilterByCategory.css';
import sortIcon from '@assets/images/arrow-drop-down.svg';

interface FilterByTypeProps {
  onFilterChange?: (type: string) => void;
}

const FilterByCategory = ({ onFilterChange }: FilterByTypeProps) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allType = { id: 'all', label: 'All' };
  
  // Rest of the filter types (excluding "All")
  const filterTypes = [
    { id: 'upperBody', label: 'Upper Body' },
    { id: 'lowerBody', label: 'Lower Body' },
    { id: 'hat', label: 'Hat' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessory', label: 'Accessory' },
    { id: 'legendary', label: 'Legendary' },
    { id: 'mythic', label: 'Mythic' },
    { id: 'epic', label: 'Epic' },
    { id: 'rare', label: 'Rare' },
    { id: 'Basic', label: 'Basic' },
    { id: 'Deluxe', label: 'Deluxe' },
    { id: 'Premium', label: 'Premium' }
  ];

  const handleFilterClick = (type: string) => {
    setSelectedType(type);
    if (onFilterChange) {
      onFilterChange(type);
    }
  };

  const handleSortClick = () => {
    if (scrollContainerRef.current) {
      // Calculate approximate width of one item (button width + gap)
      const buttonWidth = 120; // Approximate width of a button + gap
      
      // Scroll right by one item width
      scrollContainerRef.current.scrollBy({
        left: buttonWidth, // Positive value to scroll right
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative overflow-hidden w-full mb-5 md:mb-10">
      {/* Fixed "All" button on the left */}
      <div className="fixed-all-button absolute left-0 top-0 z-10 h-fit flex items-center">
        <Button
          key={allType.id}
          className={`filter-type-button text-white ${selectedType === allType.label ? 'filter-type-active' : ''}`}
          onClick={() => handleFilterClick(allType.label)}
        >
          {allType.label}
        </Button>
      </div>
      
      {/* Sort button with gradient overlay on the right */}
      <div className="sort-button-container absolute right-0 top-0 z-10 h-full flex items-center justify-center">
        <Button 
          className="sort-icon-button h-full"
          onClick={handleSortClick}
          style={{ background: 'transparent', outline: 'none', border: 'none' }}
          icon={<img src={sortIcon} alt="Sort" />}
        >
        </Button>
      </div>
      
      {/* Scrollable filter buttons */}
      <div 
        ref={scrollContainerRef}
        className="filter-buttons-scroll pl-24 pr-16 w-full overflow-x-auto pb-2"
      >
        <div className="filter-buttons-wrapper flex gap-3 min-w-max ml-[1.25rem]">
          {filterTypes.map((type) => (
            <Button
              key={type.id}
              className={`filter-type-button text-white ${selectedType === type.label ? 'filter-type-active' : ''}`}
              onClick={() => handleFilterClick(type.label)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;
