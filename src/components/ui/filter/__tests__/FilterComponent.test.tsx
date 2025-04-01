import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterComponent from '../FilterComponent';

// Mock the imported reset icon
jest.mock('@assets/images/reset-icon.svg', () => 'mock-reset-icon.svg');

// Mock antd components
jest.mock('antd', () => {
  const actual = jest.requireActual('antd');

  // Mock Slider component
  const Slider = ({
    onChange,
    value,
    min,
    max
  }: {
    onChange: (value: [number, number]) => void;
    value: [number, number];
    min: number;
    max: number;
  }) => (
    <div data-testid='mock-slider' onClick={() => onChange([min, max])}>
      <span data-testid='slider-value-min'>{value[0]}</span>
      <span data-testid='slider-value-max'>{value[1]}</span>
    </div>
  );

  // Mock Select component
  const Select = ({
    onChange,
    value,
    options,
    className
  }: {
    onChange: (value: string | number) => void;
    value: string | number;
    options: Array<{ value: string | number; label: string }>;
    className?: string;
  }) => (
    <select
      data-testid={className ? className.replace(/\s+/g, '-') : 'mock-select'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return {
    ...actual,
    Slider,
    Select
  };
});

// Mock the SearchOutlined icon
jest.mock('@ant-design/icons', () => ({
  SearchOutlined: () => <div data-testid='search-icon' />
}));

// Mock the CustomButton component
jest.mock('@components/common/Button', () => {
  return ({
    children,
    onClick,
    type,
    variant,
    icon
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: string;
    variant?: string;
    icon?: React.ReactNode;
  }) => (
    <button
      data-testid={`custom-button-${type || variant || 'default'}`}
      onClick={onClick}
    >
      {icon && <span data-testid='button-icon'>{icon}</span>}
      {children}
    </button>
  );
});

describe('FilterComponent', () => {
  // Default props
  const defaultProps = {
    onSearch: jest.fn(),
    quickSearch: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all filter elements correctly', () => {
    render(<FilterComponent {...defaultProps} />);

    // Check if search input is rendered
    expect(screen.getByPlaceholderText('Quick search')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();

    // Check if all section labels are rendered
    expect(screen.getAllByText('PRICE')[0]).toBeInTheDocument();
    expect(screen.getAllByText('PRICE')[1]).toBeInTheDocument();
    expect(screen.getByText('TIER')).toBeInTheDocument();
    expect(screen.getByText('THEME')).toBeInTheDocument();
    expect(screen.getByText('TIME')).toBeInTheDocument();
    // Note: PRICE appears twice, once for slider and once for sorting

    // Check if price slider is rendered
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();

    // Check if all select dropdowns are rendered
    expect(screen.getAllByText('All')[0]).toBeInTheDocument(); // Default TIER value
    expect(screen.getByText('Halloween')).toBeInTheDocument(); // Default THEME value
    expect(screen.getByText('Latest')).toBeInTheDocument(); // Default TIME value
    expect(screen.getByText('Low to high')).toBeInTheDocument(); // Default PRICE sort value

    // Check if action buttons are rendered
    expect(screen.getByText('Reset filter')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument(); // Reset icon
  });

  test('calls quickSearch when input value changes', () => {
    render(<FilterComponent {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Quick search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(defaultProps.quickSearch).toHaveBeenCalledWith('test search');
  });

  test('calls onSearch with all filter values when Search button is clicked', () => {
    render(<FilterComponent {...defaultProps} />);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Default values from the component's initial state
    expect(defaultProps.onSearch).toHaveBeenCalledWith({
      priceRange: [0.01, 200],
      tier: 'All',
      theme: 'Halloween',
      time: 'Latest',
      price: 'asc'
    });
  });

  test('resets all filters to default values when Reset button is clicked', () => {
    render(<FilterComponent {...defaultProps} />);

    // Change values from defaults
    const tierSelect = screen.getAllByTestId(
      'w-full-h-[2.75rem]'
    ) as HTMLSelectElement[]; // Using the className
    fireEvent.change(tierSelect[0], { target: { value: 'Premium' } });

    // Click reset button
    const resetButton = screen.getByText('Reset filter');
    fireEvent.click(resetButton);

    // Check if tier returned to 'All'
    expect(tierSelect[0].value).toBe('All');

    // Now click search to check if all values returned to defaults
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith({
      priceRange: [0.01, 200],
      tier: 'All',
      theme: 'Halloween',
      time: 'Latest',
      price: 'asc'
    });
  });

  test('price slider shows correct range values', () => {
    render(<FilterComponent {...defaultProps} />);

    // Check initial values
    expect(screen.getByTestId('slider-value-min').textContent).toBe('0.01');
    expect(screen.getByTestId('slider-value-max').textContent).toBe('200');

    // Simulate slider change by clicking the mock slider (our mock implementation sets to min, max)
    const slider = screen.getByTestId('mock-slider');
    fireEvent.click(slider);

    // Values should be updated to min, max according to our mock
    expect(screen.getByText('0.01 ETH')).toBeInTheDocument();
    expect(screen.getByText('200 ETH')).toBeInTheDocument();
  });

  test('updates tier value when dropdown is changed', () => {
    render(<FilterComponent {...defaultProps} />);

    const tierSelect = screen.getAllByTestId(
      'w-full-h-[2.75rem]'
    ) as HTMLSelectElement[];
    fireEvent.change(tierSelect[0], { target: { value: 'Premium' } });

    expect(tierSelect[0].value).toBe('Premium');

    // Click search to verify the new value is passed to onSearch
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        tier: 'Premium'
      })
    );
  });

  test('updates theme value when dropdown is changed', () => {
    render(<FilterComponent {...defaultProps} />);

    // All select elements have the same test ID based on className, so we need to find the right one
    const selects = screen.getAllByTestId('w-full-h-[2.75rem]');
    const themeSelect = selects[1]; // Theme is the second select

    fireEvent.change(themeSelect, { target: { value: 'Dark' } });

    // Click search to verify the new value is passed to onSearch
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'Dark'
      })
    );
  });

  test('updates time value when dropdown is changed', () => {
    render(<FilterComponent {...defaultProps} />);

    const selects = screen.getAllByTestId('w-full-h-[2.75rem]');
    const timeSelect = selects[2]; // Time is the third select

    fireEvent.change(timeSelect, { target: { value: 'asc' } });

    // Click search to verify the new value is passed to onSearch
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        time: 'asc'
      })
    );
  });

  test('updates price sort value when dropdown is changed', () => {
    render(<FilterComponent {...defaultProps} />);

    const selects = screen.getAllByTestId('w-full-h-[2.75rem]');
    const priceSortSelect = selects[3]; // Price sort is the fourth select

    fireEvent.change(priceSortSelect, { target: { value: 'desc' } });

    // Click search to verify the new value is passed to onSearch
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        price: 'desc'
      })
    );
  });

  test('formats price labels correctly', () => {
    render(<FilterComponent {...defaultProps} />);

    // Check if the price values are displayed with ETH
    expect(screen.getByText('0.01 ETH')).toBeInTheDocument();
    expect(screen.getByText('200 ETH')).toBeInTheDocument();
  });
});
