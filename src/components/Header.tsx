import { useState } from 'react';
import { Button, Dropdown, Space, Drawer } from 'antd';
import { DownOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import './header.css';

interface HeaderProps {
  onConnectWallet?: () => void;
}

const Header = ({ onConnectWallet }: HeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
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
    { key: 'fr', label: 'French' },
    { key: 'es', label: 'Spanish' }
  ];

  const handleLanguageChange = (key: string) => {
    const languageMap: Record<string, string> = {
      en: 'EN',
      fr: 'FR',
      es: 'ES'
    };
    setSelectedLanguage(languageMap[key] || 'EN');
  };

  const handleMenuClick = (label: string) => {
    setMenuItems(menuItems.map((item) => ({ ...item, active: item.label === label })));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className='w-full h-[5.25rem] flex justify-center items-center text-white p-3 absolute top-0 z-10 bg-[#17161AB2] header-container'>
      <div className='w-full flex items-center justify-around'>
        {/* Navigation links - desktop */}
        <nav className='md:flex space-x-8'>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={() => handleMenuClick(item.label)}
              className={`${item.active ? 'active-link' : ''} menu-item text-white hover:text-white transition-colors text-sm font-bold`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <Button
            type='text'
            icon={<MenuOutlined className='text-white text-xl' />}
            onClick={toggleMobileMenu}
            className='border-none'
          />
        </div>

        {/* Right side elements */}
        <div className='flex items-center space-x-4'>
          {/* Connect Wallet button */}
          <Button
            type='primary'
            onClick={onConnectWallet}
            className='bg-pink-500 hover:bg-pink-600 border-none rounded-md text-white'
          >
            Connect Wallet
          </Button>

          {/* Language dropdown */}
          <Dropdown
            menu={{
              items: languageItems.map((item) => ({
                key: item.key,
                label: item.label,
                onClick: () => handleLanguageChange(item.key)
              }))
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()} className='flex items-center'>
              <Space className='text-white'>
                <GlobalOutlined />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <Drawer title='Menu' placement='left' onClose={toggleMobileMenu} open={mobileMenuOpen} bodyStyle={{ padding: 0 }}>
        <div className='flex flex-col py-4'>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`px-6 py-3 ${item.active ? 'text-gradient-primary font-semibold' : 'text-gray-700'} hover:bg-gray-100`}
              onClick={toggleMobileMenu}
              style={
                item.active
                  ? {
                      background: 'linear-gradient(to right, #DA458F, #DA34DD)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }
                  : {}
              }
            >
              {item.label}
            </a>
          ))}
          <div className='mt-4 px-6'>
            <Button
              type='primary'
              onClick={() => {
                if (onConnectWallet) onConnectWallet();
                toggleMobileMenu();
              }}
              className='bg-pink-500 hover:bg-pink-600 border-none rounded-md text-white w-full'
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
