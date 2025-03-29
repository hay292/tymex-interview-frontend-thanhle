import { useState } from 'react';
import { Button } from 'antd';
import './FilterByCategory.css';
import sortIcon from '../../../assets/images/arrow-drop-down.svg';

interface FilterByTypeProps {
  onFilterChange?: (type: string) => void;
}

const FilterByCategory = ({ onFilterChange }: FilterByTypeProps) => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const filterTypes = [
    { id: 'all', label: 'All' },
    { id: 'upperBody', label: 'Upper Body' },
    { id: 'lowerBody', label: 'Lower Body' },
    { id: 'hat', label: 'Hat' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessory', label: 'Accessory' },
    { id: 'legendary', label: 'Legendary' },
    { id: 'mythic', label: 'Mythic' },
    { id: 'epic', label: 'Epic' },
    { id: 'rare', label: 'Rare' }
  ];

  const handleFilterClick = (type: string) => {
    setSelectedType(type);
    if (onFilterChange) {
      onFilterChange(type);
    }
  };

  return (
    <div className='filter-by-type-container w-full overflow-x-auto w-full pb-2'>
      <div className='filter-buttons-wrapper flex gap-6 px-2 min-w-max'>
        {filterTypes.map((type) => (
          <Button
            key={type.id}
            className={`filter-type-button text-white ${selectedType === type.label ? 'filter-type-active' : ''}`}
            onClick={() => handleFilterClick(type.label)}
          >
            {type.label}
          </Button>
        ))}
        <Button className={`sort-icon`}>
          <img src={sortIcon} alt='Sort' />
        </Button>
      </div>
    </div>
  );
};

export default FilterByCategory;
