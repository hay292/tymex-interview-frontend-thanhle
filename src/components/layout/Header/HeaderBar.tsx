import { useState } from 'react';
import { Dropdown, Space, Drawer } from 'antd';
import languageIcon from '@assets/images/world.svg';
import downIcon from '@assets/images/bxs-chevron-down.svg';
import './styles.css';
import CustomButton from '@components/common/Button';

const HeaderBar = () => {
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
    setMenuItems(
      menuItems.map((item) => ({ ...item, active: item.label === label }))
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className='w-full h-[5.25rem] flex justify-center items-center text-white p-3 absolute top-0 z-40 bg-[#17161AB2] header-container'>
      <div className='w-full flex items-center justify-between lg:justify-around mx-2 lg:mx-0'>
        {/* Navigation links - desktop */}
        <nav className='hidden lg:flex space-x-8'>
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
        <div className='lg:hidden' onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
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
          >
            Connect Wallet
          </CustomButton>

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
            <a
              onClick={(e) => e.preventDefault()}
              className='flex items-center'
            >
              <Space className='text-white'>
                <img src={languageIcon} alt="language" />
                <img src={downIcon} alt="down" />
              </Space>
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
            <a
              key={index}
              href={item.link}
              className={`font-drone px-6 py-3 ${item.active ? 'text-gradient-primary font-semibold' : 'text-white'}`}
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
            <CustomButton
              type='primary'
              onClick={() => {
                toggleMobileMenu();
              }}
              className='btn-gradient w-full h-[2.5rem]'
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
