import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CardItem from '../index';
import { ProductService } from '@services/product.service';
import { Product } from '@/types/product';

// Mock the ProductService
jest.mock('@services/product.service', () => ({
  ProductService: {
    favorite: jest.fn()
  }
}));

// Mock images
jest.mock('@assets/images/character1.svg', () => 'character1.svg');
jest.mock('@assets/images/character2.svg', () => 'character2.svg');
jest.mock('@assets/images/character3.svg', () => 'character3.svg');
jest.mock('@assets/images/character4.svg', () => 'character4.svg');
jest.mock('@assets/images/ethereum.svg', () => 'ethereum.svg');

// Mock react-query
let isPendingState = false;
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: () => ({
    mutate: (data: Product) => {
      ProductService.favorite(data, 1);
    },
    isPending: isPendingState
  })
}));

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  name: 'Test Product',
  tier: 'Basic',
  price: 1.5,
  isFavorite: false,
  category: 'upperBody',
  createdAt: 1704067200000,
  imageId: 1,
  theme: 'Light',
  author: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    gender: 'male',
    avatar: 'avatar.jpg',
    onlineStatus: 'offline'
  }
};

// Tạo QueryClient wrapper cho testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('CardItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    renderWithQueryClient(<CardItem {...mockProduct} />);

    // Kiểm tra các element hiển thị đúng
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('1.50 ETH')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
  });

  it('handles favorite button click', async () => {
    renderWithQueryClient(<CardItem {...mockProduct} />);
    
    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    // Kiểm tra xem mutation đã được gọi
    expect(ProductService.favorite)
      .toHaveBeenCalledWith(
        "1",
        1
      );
  });

  it('displays correct tier-specific styling', () => {
    renderWithQueryClient(<CardItem {...mockProduct} />);
    
    const imageContainer = screen.getByTestId('product-image').parentElement;
    expect(imageContainer).toHaveClass(
      'bg-[linear-gradient(90.13deg,#DD5AFE_0%,#6366F1_100%)]'
    );
  });

  it('truncates long title', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated'
    };
    
    renderWithQueryClient(<CardItem {...longTitleProduct} />);
    
    const titleElement = screen.getByText(/This is a very long/);
    expect(titleElement).toHaveClass('truncate');
    expect(titleElement).toHaveAttribute('title', longTitleProduct.title);
  });

  it('prevents favorite toggle when mutation is pending', () => {
    isPendingState = true;
    renderWithQueryClient(<CardItem {...mockProduct} />);
    const favoriteButton = screen.getByRole('button');
    
    fireEvent.click(favoriteButton);
    
    expect(ProductService.favorite)
      .not.toHaveBeenCalled();
    
    isPendingState = false;
  });

  it('displays favorite button with correct initial state', () => {
    // Test when not favorited
    const { unmount } = renderWithQueryClient(<CardItem {...mockProduct} />);
    const favoriteButton = screen.getByRole('button', { name: 'Toggle favorite' });
    const heartIcon = favoriteButton.querySelector('.anticon');
    expect(heartIcon).toHaveAttribute('style', 'color: white;');
    unmount();

    // Test when favorited
    renderWithQueryClient(<CardItem {...mockProduct} isFavorite={true} />);
    const favoritedButton = screen.getByRole('button', { name: 'Toggle favorite' });
    const favoritedHeartIcon = favoritedButton.querySelector('.anticon');
    expect(favoritedHeartIcon).toHaveAttribute('style', 'color: red;');
  });
});