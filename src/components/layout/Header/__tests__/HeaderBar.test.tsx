import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderBar from '../HeaderBar';

interface MenuItem {
  key: string;
  label: string;
}

interface DropdownProps {
  children: React.ReactNode;
  menu: {
    items: MenuItem[];
  };
}

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  onClick?: () => void;
}

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Mock Link component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, className, onClick, style, 'data-testid': dataTestId }: LinkProps) => (
    <a 
      href={to} 
      className={className} 
      onClick={onClick} 
      style={style}
      data-testid={dataTestId}
    >
      {children}
    </a>
  ),
}));

// Mock CustomButton component
jest.mock('@components/common/Button', () => ({
  __esModule: true,
  default: ({ children, className, width, onClick }: CustomButtonProps) => (
    <button 
      className={className} 
      style={{ width }} 
      onClick={onClick}
      data-testid={className?.includes('hidden') ? 'desktop-connect-wallet' : 'mobile-connect-wallet'}
    >
      {children}
    </button>
  ),
}));

// Mock the antd components
jest.mock('antd', () => ({
  Dropdown: ({ children, menu }: DropdownProps) => (
    <div data-testid="language-dropdown">
      {children}
      <div data-testid="language-menu">
        {menu.items.map((item) => (
          <div key={item.key}>{item.label}</div>
        ))}
      </div>
    </div>
  ),
  Drawer: ({ children, open }: DrawerProps) => (
    <div data-testid="mobile-drawer" style={{ display: open ? 'block' : 'none' }}>
      {children}
    </div>
  ),
}));

// Mock the images
jest.mock('@assets/images/world.svg', () => 'world-icon');
jest.mock('@assets/images/bxs-chevron-down.svg', () => 'down-icon');

describe('HeaderBar Component', () => {
  const renderHeaderBar = () => {
    return render(
      <MemoryRouter>
        <HeaderBar />
      </MemoryRouter>
    );
  };

  it('renders desktop navigation menu', () => {
    renderHeaderBar();
    
    // Check if all menu items are rendered in desktop view
    const menuItems = ['HOME', 'ABOUT US', 'OUR TEAMS', 'MARKETPLACE', 'ROADMAP', 'WHITEPAPER'];
    menuItems.forEach(item => {
      const desktopLink = screen.getByTestId(`desktop-${item.toLowerCase().replace(/\s+/g, '-')}`);
      expect(desktopLink).toBeInTheDocument();
      expect(desktopLink).toHaveTextContent(item);
    });

    // Check if active menu item has correct class
    const activeItem = screen.getByTestId('desktop-marketplace');
    expect(activeItem).toHaveClass('active-link');
  });

  it('renders connect wallet buttons', () => {
    renderHeaderBar();
    
    // Check desktop connect wallet button
    const desktopButton = screen.getByTestId('desktop-connect-wallet');
    expect(desktopButton).toBeInTheDocument();
    expect(desktopButton).toHaveClass('btn-gradient');
    expect(desktopButton).toHaveTextContent('Connect Wallet');
    
    // Open mobile menu to check mobile connect wallet button
    const hamburger = screen.getByTestId('hamburger-menu');
    fireEvent.click(hamburger);
    
    const mobileButton = screen.getByTestId('mobile-connect-wallet');
    expect(mobileButton).toBeInTheDocument();
    expect(mobileButton).toHaveClass('btn-gradient');
    expect(mobileButton).toHaveTextContent('Connect Wallet');
  });

  it('renders language dropdown', () => {
    renderHeaderBar();
    
    const dropdown = screen.getByTestId('language-dropdown');
    expect(dropdown).toBeInTheDocument();
    
    const languageOptions = screen.getByTestId('language-menu');
    expect(languageOptions).toHaveTextContent('English');
    expect(languageOptions).toHaveTextContent('Vietnamese');
  });

  it('renders mobile menu button', () => {
    renderHeaderBar();
    
    const hamburger = screen.getByTestId('hamburger-menu');
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveClass('hamburger');
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderHeaderBar();
    
    const hamburger = screen.getByTestId('hamburger-menu');
    const drawer = screen.getByTestId('mobile-drawer');
    
    // Initially drawer should be closed
    expect(drawer).toHaveStyle({ display: 'none' });
    
    // Click hamburger to open drawer
    fireEvent.click(hamburger);
    expect(drawer).toHaveStyle({ display: 'block' });
    
    // Click hamburger again to close drawer
    fireEvent.click(hamburger);
    expect(drawer).toHaveStyle({ display: 'none' });
  });

  it('renders mobile menu items when drawer is open', () => {
    renderHeaderBar();
    
    // Open mobile menu
    const hamburger = screen.getByTestId('hamburger-menu');
    fireEvent.click(hamburger);
    
    // Check if all menu items are rendered in mobile view
    const menuItems = ['HOME', 'ABOUT US', 'OUR TEAMS', 'MARKETPLACE', 'ROADMAP', 'WHITEPAPER'];
    menuItems.forEach(item => {
      const mobileLink = screen.getByTestId(`mobile-${item.toLowerCase().replace(/\s+/g, '-')}`);
      expect(mobileLink).toBeInTheDocument();
      expect(mobileLink).toHaveClass('font-drone');
      expect(mobileLink).toHaveTextContent(item);
    });
  });

  it('updates active menu item when clicked', () => {
    renderHeaderBar();
    
    const homeLink = screen.getByTestId('desktop-home');
    fireEvent.click(homeLink);
    
    // Check if HOME is now active and MARKETPLACE is not
    expect(homeLink).toHaveClass('active-link');
    expect(screen.getByTestId('desktop-marketplace')).not.toHaveClass('active-link');
  });

  it('closes mobile menu when a menu item is clicked', () => {
    renderHeaderBar();
    
    // Open mobile menu
    const hamburger = screen.getByTestId('hamburger-menu');
    fireEvent.click(hamburger);
    
    // Click a menu item in mobile view
    const mobileHomeLink = screen.getByTestId('mobile-home');
    fireEvent.click(mobileHomeLink);
    
    // Check if drawer is closed
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer).toHaveStyle({ display: 'none' });
  });
}); 