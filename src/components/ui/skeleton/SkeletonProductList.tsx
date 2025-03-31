import React from 'react';
import SkeletonCard from './SkeletonCard';

interface SkeletonProductListProps {
  count?: number;
}

const SkeletonProductList: React.FC<SkeletonProductListProps> = ({ count = 8 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};

export default SkeletonProductList; 