import { useState } from 'react';
import { Dropdown, Drawer } from 'antd';
import languageIcon from '@assets/images/world.svg';
import downIcon from '@assets/images/bxs-chevron-down.svg';
import './styles.css';
import CustomButton from '@components/common/Button';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([
    { label: 'HOME', link: '#', active: false },
    { label: 'ABOUT US', link: '#', active: false },
    { label: 'OUR TEAMS', link: '#', active: false },
    { label: 'MARKETPLACE', link: '#', active: true },
    { label: 'ROADMAP', link: '#', active: false },
    { label: 'WHITEPAPER', link: '#', active: false }
  ]);

  const languageItems = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Vietnamese' },
  ];

  const handleMenuClick = (label: string) => {
    setMenuItems(
      menuItems.map((item) => ({ ...item, active: item.label === label }))
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className='w-full h-[5.25rem] flex justify-center items-center text-white absolute top-0 z-40 bg-[#17161AB2] header-container'>
      <div className='container mx-auto px-5 flex items-center justify-between'>
        {/* Navigation links - desktop */}
        <nav className='hidden lg:flex space-x-8'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => handleMenuClick(item.label)}
              className={`${item.active ? 'active-link' : ''} menu-item text-white hover:text-white transition-colors text-sm font-bold`}
              data-testid={`desktop-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className='lg:hidden' onClick={toggleMobileMenu}>
          <div data-testid="hamburger-menu" className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>

        {/* Right side elements */}
        <div className='flex items-center space-x-4'>
          {/* Connect Wallet button */}
          <CustomButton
            type='primary'
            className='hidden lg:block btn-gradient h-[2.5rem]'
            width='10rem'
          >
            Connect Wallet
          </CustomButton>

          {/* Language dropdown */}
          <Dropdown
            menu={{
              items: languageItems.map((item) => ({
                key: item.key,
                label: item.label,
              }))
            }}
            trigger={['click']}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className='flex items-center'
            >
              <div className='flex items-center gap-2 text-white'>
                <img src={languageIcon} alt="language" />
                <img src={downIcon} alt="down" />
              </div>
            </a>
          </Dropdown>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <Drawer
        className='mobile-drawer'
        placement='left'
        open={mobileMenuOpen}
        bodyStyle={{ padding: 0 }}
        closable={false}
      >
        <div className='flex flex-col py-4'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`font-drone text-center px-6 py-3 ${item.active ? 'text-gradient-primary font-semibold' : 'text-white'}`}
              onClick={toggleMobileMenu}
              data-testid={`mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              style={
                item.active
                  ? {
                      background: 'linear-gradient(to right, #DA458F, #DA34DD)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }
                  : { color: 'white' }
              }
            >
              {item.label}
            </Link>
          ))}
          <div className='mt-4 px-6 mx-auto'>
            <CustomButton
              type='primary'
              onClick={() => {
                toggleMobileMenu();
              }}
              className='btn-gradient h-[2.5rem]'
              width='10rem'
            >
              Connect Wallet
            </CustomButton>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default HeaderBar;
