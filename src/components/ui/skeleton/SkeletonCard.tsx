import React from 'react';
import { Card, Skeleton } from 'antd';
import './SkeletonCard.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full h-fit">
      <Card className='item-card bg-[#1a1a1a] border-0 rounded-lg overflow-hidden w-full h-fit skeleton-pulse'>
        <div className='relative'>
          {/* Rarity Badge Skeleton */}
          <div className='absolute top-2 left-2 z-10'>
            <Skeleton.Button active size="small" style={{ width: '60px', height: '24px', borderRadius: '6px' }} />
          </div>
          
          {/* Image Skeleton */}
          <div className="rounded-lg h-[220px] w-full overflow-hidden skeleton-image">
            <Skeleton.Image active style={{ borderRadius: '8px', width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Item Details Skeleton */}
        <div className='pt-6 text-white'>
          <div className='flex justify-between items-center flex-wrap'>
            <Skeleton.Button active size="small" style={{ width: '60%', height: '20px' }} />
            <Skeleton.Button active size="small" style={{ width: '25%', height: '20px' }} />
          </div>

          {/* Creator Info Skeleton */}
          <div className='flex items-center pt-4 md:pt-5'>
            <Skeleton.Avatar active size="small" shape="circle" />
            <Skeleton.Button active size="small" style={{ width: '40%', height: '16px', marginLeft: '10px' }} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkeletonCard; 