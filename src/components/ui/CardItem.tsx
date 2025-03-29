import React, { useMemo } from 'react';
import { Card, Button, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import './CardItem.css';
import { Product } from '../../type/product';
import character1 from '../../assets/images/character1.svg';
import character2 from '../../assets/images/character2.svg';
import character3 from '../../assets/images/character3.svg';
import character4 from '../../assets/images/character4.svg';

const CardItem: React.FC<Product> = (product) => {
  //   if (onFavoriteToggle) {
  //     onFavoriteToggle(id);
  //   }
  // };

  const imageMap = useMemo(() => {
    return {
      Basic: character1,
      Deluxe: character2,
      Premium: character3,
      default: character4
    };
  }, []);

  const imageBgMap = useMemo(() => {
    return {
      Basic: 'bg-[linear-gradient(90.13deg,#DD5AFE_0%,#6366F1_100%)]',
      Deluxe: 'bg-[linear-gradient(90.13deg,#49DD81_0%,#22B4C6_100%)]',
      Premium: 'bg-[linear-gradient(90.13deg,#FE955A_0%,#F1DA63_100%)]'
    };
  }, []);

  return (
    <Card className='hero-item-card bg-[#1a1a1a] border-0 rounded-lg overflow-hidden'>
      <div className='relative'>
        {/* Rarity Badge */}
        <div className='absolute top-2 left-2 z-10'>
          <span
            className={`rarity-badge px-3 py-1 text-xs text-white font-medium rounded-md bg-[#313B4580] h-[1.75rem]`}
          >
            {product.tier}
          </span>
        </div>

        {/* Favorite Button */}
        <Button
          className='absolute top-2 right-2 bg-transparent border-0 favorite-button z-10'
          // onClick={handleFavoriteClick}
          icon={
            <HeartFilled
              className={`text-pink-500 text-xl ${product.isFavorite ? 'liked-icon' : ''}`}
            />
          }
        />
        {/* Hero Image */}
        <div
          className={`hero-image-container rounded-lg flex justify-center items-end ${imageBgMap[product.tier as keyof typeof imageBgMap]}`}
        >
          <img
            src={`${imageMap[product.tier as keyof typeof imageMap]}`}
            alt={product.name}
            className='w-auto h-auto'
            loading='lazy'
          />
        </div>
      </div>

      {/* Item Details */}
      <div className='pt-6 text-white'>
        <div className='flex justify-between items-center flex-wrap'>
          <h3 className='text-white text-base font-medium m-0'>
            {product.title}
          </h3>
          <div className='flex items-center'>
            <img
              src='/ethereum-icon.svg'
              alt='ETH'
              className='h-4 w-auto mr-1'
            />
            <span className='text-white font-medium'>
              {product.price.toFixed(2)} ETH
            </span>
          </div>
        </div>

        {/* Creator Info */}
        <div className='flex items-center pt-5'>
          <Avatar
            className='flex items-center justify-center avatar-image'
            icon={
              <img src={product.author.avatar} alt={product.author.firstName} />
            }
          />
          <span className='text-gray-400 text-sm pl-2'>
            {product.author.firstName}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
