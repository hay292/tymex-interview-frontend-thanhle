import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../index';
import { ProductService } from '@services/product.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the components used in the Home page
jest.mock('@components/ui/filter/FilterByCategory', () => {
  return ({ onFilterChange }: { onFilterChange: (type: string) => void }) => (
    <div data-testid='filter-by-category'>
      <button data-testid='category-all' onClick={() => onFilterChange('All')}>
        All
      </button>
      <button
        data-testid='category-shoes'
        onClick={() => onFilterChange('Shoes')}
      >
        Shoes
      </button>
    </div>
  );
});

jest.mock('@components/ui/filter/FilterComponent', () => {
  return ({
    onSearch,
    quickSearch
  }: {
    onSearch: (filters: FilterValues) => void;
    quickSearch: (value: string) => void;
  }) => (
    <div data-testid='filter-component'>
      <input
        data-testid='quick-search-input'
        onChange={(e) => quickSearch(e.target.value)}
      />
      <button
        data-testid='search-button'
        onClick={() =>
          onSearch({
            priceRange: [0.01, 100],
            tier: 'Premium',
            theme: 'Dark',
            time: 'asc',
            price: 'desc'
          })
        }
      >
        Search
      </button>
    </div>
  );
});

// Define FilterValues interface to use in tests
interface FilterValues {
  priceRange: [number, number];
  tier?: string;
  theme?: string;
  time?: string;
  price?: 'asc' | 'desc';
}

jest.mock('@components/common/Card', () => {
  return (props: {
    id: number;
    name: string;
    price: number;
    category?: string;
    [key: string]: number | string | undefined;
  }) => (
    <div data-testid={`product-card-${props.id}`}>
      <span data-testid='product-name'>{props.name}</span>
      <span data-testid='product-price'>{props.price}</span>
    </div>
  );
});

jest.mock('@components/ui/skeleton/SkeletonProductList', () => {
  return ({ count }: { count: number }) => (
    <div data-testid='skeleton-product-list'>Loading {count} items...</div>
  );
});

jest.mock('@components/common/Button', () => {
  return ({
    children,
    onClick,
    disabled,
    loading,
    icon
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    type?: string;
    width?: string;
  }) => (
    <button
      data-testid={`button-${children || 'icon-only'}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span data-testid='button-icon'>{icon}</span>}
      {children}
    </button>
  );
});

jest.mock('@ant-design/icons', () => ({
  CloseOutlined: () => <div data-testid='close-icon' />,
  FilterOutlined: () => <div data-testid='filter-icon' />,
  SearchOutlined: () => <div data-testid='search-icon' />,
  InboxOutlined: () => <div data-testid='inbox-icon' />
}));

jest.mock('antd', () => {
  return {
    Drawer: ({
      children,
      open,
      onClose
    }: {
      children: React.ReactNode;
      open: boolean;
      onClose: () => void;
      placement?: string;
      closeIcon?: React.ReactNode;
      width?: number;
      bodyStyle?: React.CSSProperties;
      headerStyle?: React.CSSProperties;
      className?: string;
    }) =>
      open ? (
        <div data-testid='filter-drawer'>
          <button data-testid='close-drawer' onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      ) : null
  };
});

// Mock the imported SVG
jest.mock('@assets/images/bottom-line.svg', () => 'mock-bottom-line.svg');

// Mock the product service
jest.mock('@services/product.service', () => ({
  ProductService: {
    getProducts: jest.fn()
  }
}));

// Mock useDebounce hook
jest.mock('@hooks/useDebounce', () => ({
  useDebounce: (value: string | undefined) => value
}));

describe('Home Component', () => {
  // Setup a fresh QueryClient for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  const mockProducts = [
    { id: 1, name: 'Product 1', price: 10, category: 'Shoes' },
    { id: 2, name: 'Product 2', price: 20, category: 'Hat' },
    { id: 3, name: 'Product 3', price: 30, category: 'Shoes' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the products API
    (ProductService.getProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
      headers: { 'x-total-count': '3' }
    });
  });

  const renderWithQueryClient = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  test('renders Home component with loading state initially', async () => {
    // Mock initial loading state
    (ProductService.getProducts as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: mockProducts,
                headers: { 'x-total-count': '3' }
              }),
            100
          )
        )
    );

    renderWithQueryClient(<Home />);

    // Should show loading skeleton
    expect(screen.getByTestId('skeleton-product-list')).toBeInTheDocument();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });
  });

  test('renders products after loading', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    });
  });

  test('shows empty state when no products match criteria', async () => {
    // Mock empty response
    (ProductService.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [],
      headers: { 'x-total-count': '0' }
    });

    renderWithQueryClient(<Home />);

    // Wait for empty state to appear
    await waitFor(() => {
      expect(screen.getByTestId('inbox-icon')).toBeInTheDocument();
      expect(
        screen.getByText('No data found matching your criteria.')
      ).toBeInTheDocument();
    });
  });

  test('filters products by category', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });

    // Mock the filtered response
    (ProductService.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Product 1', price: 10, category: 'Shoes' },
        { id: 3, name: 'Product 3', price: 30, category: 'Shoes' }
      ],
      headers: { 'x-total-count': '2' }
    });

    // Click on Shoes category
    fireEvent.click(screen.getByTestId('category-shoes'));

    // Verify getProducts was called with correct params
    await waitFor(() => {
      expect(ProductService.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'Shoes'
        })
      );
    });
  });

  test('applies filter and search criteria', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });

    // Mock the filtered response
    (ProductService.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 2, name: 'Product 2', price: 20, category: 'Hat' }],
      headers: { 'x-total-count': '1' }
    });

    // Apply search criteria
    fireEvent.click(screen.getByTestId('search-button'));

    // Verify getProducts was called with correct params
    await waitFor(() => {
      expect(ProductService.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          _limit: 20,
          _order: 'desc,asc',
          _page: 1,
          _sort: 'price,createdAt',
          category: undefined,
          price_gte: 0.01,
          price_lte: 100,
          q: undefined,
          theme: 'Dark',
          tier: 'Premium'
        })
      );
    });
  });

  test('applies quick search filter', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });

    // Mock the filtered response
    (ProductService.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 1, name: 'Product 1', price: 10, category: 'Shoes' }],
      headers: { 'x-total-count': '1' }
    });

    // Apply quick search
    fireEvent.change(screen.getByTestId('quick-search-input'), {
      target: { value: 'Product 1' }
    });

    // Verify getProducts was called with correct params
    await waitFor(() => {
      expect(ProductService.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'Product 1'
        })
      );
    });
  });

  test('opens and closes filter drawer on mobile', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });

    // Find mobile filter button (using test id)
    const filterButton = screen.getByTestId('button-icon-only');
    expect(filterButton).toBeInTheDocument();

    // Click to open drawer
    fireEvent.click(filterButton);

    // Drawer should be visible
    expect(screen.getByTestId('filter-drawer')).toBeInTheDocument();

    // Close the drawer
    fireEvent.click(screen.getByTestId('close-drawer'));

    // Drawer should be closed
    expect(screen.queryByTestId('filter-drawer')).not.toBeInTheDocument();
  });

  test('loads more products when clicking view more button', async () => {
    // Mock hasNextPage to be true
    (ProductService.getProducts as jest.Mock).mockImplementation((params) => {
      if (params._page === 1) {
        return Promise.resolve({
          data: mockProducts.slice(0, 2),
          headers: { 'x-total-count': '5' }
        });
      } else {
        return Promise.resolve({
          data: mockProducts.slice(2),
          headers: { 'x-total-count': '5' }
        });
      }
    });

    renderWithQueryClient(<Home />);

    // Wait for initial products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    });

    // View more button should be visible
    const viewMoreButton = screen.getByTestId('button-View more');
    expect(viewMoreButton).toBeInTheDocument();

    // Click to load more
    fireEvent.click(viewMoreButton);

    // Wait for additional products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
    });

    // Verify getProducts was called with page 2
    expect(ProductService.getProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        _page: 2
      })
    );
  });

  test('mobile search input works correctly', async () => {
    renderWithQueryClient(<Home />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    });

    // Find mobile search input (there could be multiple inputs, so we need to be careful)
    const mobileSearchInputs = screen.getAllByPlaceholderText('Quick search');
    expect(mobileSearchInputs.length).toBeGreaterThan(0);

    // Mock the filtered response
    (ProductService.getProducts as jest.Mock).mockResolvedValueOnce({
      data: [{ id: 1, name: 'Product 1', price: 10, category: 'Shoes' }],
      headers: { 'x-total-count': '1' }
    });

    // Apply search using the first input (should be mobile one)
    fireEvent.change(mobileSearchInputs[0], {
      target: { value: 'Mobile search' }
    });

    // Verify getProducts was called with correct params
    await waitFor(() => {
      expect(ProductService.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'Mobile search'
        })
      );
    });
  });
});
