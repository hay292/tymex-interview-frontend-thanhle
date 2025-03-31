import React, { useMemo } from 'react';
import { Card, Button, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import './styles.css';
import { Product } from '@/types/product';
import character1 from '@assets/images/character1.svg';
import character2 from '@assets/images/character2.svg';
import character3 from '@assets/images/character3.svg';
import character4 from '@assets/images/character4.svg';
import ethIcon from '@assets/images/ethereum.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@services/product.service';

interface QueryData {
  pages: Array<{
    data: Product[];
  }>;
}

const CardItem: React.FC<Product> = (product) => {
  const queryClient = useQueryClient();

  // Setup mutation for toggling favorite status
  const toggleFavoriteMutation = useMutation({
    mutationFn: (productId: string) => 
      ProductService.favorite({...product, isFavorite: !product.isFavorite}, parseInt(productId)),

    onMutate: async (productId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['product'] });
      
      const previousProducts = queryClient.getQueryData<QueryData>(['product']);

      queryClient.setQueryData<QueryData>(['product'], (old) => {
        if (!old) return old;
        
        // Find and update the product in all pages
        const pages = old.pages.map((page) => {
          const data = page.data.map((p: Product) => 
            p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
          );
          return { ...page, data };
        });
        
        return { ...old, pages };
      });
      
      return { previousProducts };
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['product'], context.previousProducts);
      }
      console.error('Error toggling favorite:', err);
    },
    
    // Always refetch after error or success to ensure data is in sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (toggleFavoriteMutation.isPending) return;
    toggleFavoriteMutation.mutate(product.id);
  };

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
    <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
      <Card className='item-card bg-[#1a1a1a] border-0 rounded-lg overflow-hidden w-full h-full'>
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
            onClick={handleFavoriteClick}
            icon={<HeartFilled style={{ color: product.isFavorite ? 'red' : 'white' }} />}
          />
          {/* Hero Image */}
          <div
            className={`image-container rounded-lg ${imageBgMap[product.tier as keyof typeof imageBgMap]}`}
          >
            <img
              src={`${imageMap[product.tier as keyof typeof imageMap]}`}
              alt={product.name}
              loading='lazy'
            />
          </div>
        </div>

        {/* Item Details */}
        <div className='pt-6 text-white'>
          <div className='flex justify-between items-center flex-wrap'>
            <h3 className='text-white text-sm md:text-base font-medium m-0 truncate max-w-[70%]'>
              {product.title}
            </h3>
            <div className='flex items-center'>
              <img
                src={ethIcon}
                alt='ETH'
                className='h-4 w-auto mr-1'
              />
              <span className='text-white font-medium text-xs md:text-sm'>
                {product.price.toFixed(2)} ETH
              </span>
            </div>
          </div>

          {/* Creator Info */}
          <div className='flex items-center pt-4 md:pt-5'>
            <Avatar
              className='flex items-center justify-center avatar-image'
              icon={
                <img src={product.author.avatar} alt={product.author.firstName} />
              }
              size="small"
            />
            <span className='text-gray-400 text-xs md:text-sm pl-2'>
              {product.author.firstName}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardItem;
