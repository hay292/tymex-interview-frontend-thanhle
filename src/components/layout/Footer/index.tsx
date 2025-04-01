import React from 'react';
import { Link } from 'react-router-dom';
import phoneIcon from '@assets/images/phone.svg';
import emailIcon from '@assets/images/mail.svg';
import CustomButton from '@components/common/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1D] text-white pt-10 xl:pt-[3.75rem] pb-16 md:pb-20 xl:pb-[13rem]">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Section */}
          <div className="md:col-span-1">
            <h3 className="font-drone text-xl mb-4">NAVIGATION</h3>
            <div className="grid grid-cols-3 gap-2">
                <ul className="space-y-2">
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Home</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">About us</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Our teams</Link></li>
                </ul>
                <ul className="space-y-2">
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Whitepaper</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Marketplace</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Roadmap</Link></li>
                </ul>
                <ul className="space-y-2">
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">FAQs</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">News</Link></li>
                  <li><Link to="#" className="font-medium hover:text-pink-500 transition">Community</Link></li>
                </ul>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="md:col-span-1">
            <h3 className="font-drone text-xl mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                 <img src={phoneIcon} alt="phone" />
                </div>
                <span className='font-medium'>01234568910</span>
              </li>
              <li className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <img src={emailIcon} alt="email" />
                </div>
                <span className='font-medium'>tymex-talent@tyme.com</span>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="md:col-span-1">
            <h3 className="font-drone text-xl mb-4">SUBSCRIBE TO RECEIVE OUR LATEST UPDATE</h3>
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 items-stretch">
              <input
                placeholder="Your email address"
                className="bg-transparent border border-white rounded-md py-2 px-3 text-white text-xs placeholder-[#89888B] h-[2.75rem] flex-1"
              />
              <CustomButton
                type="primary"
                className="btn-gradient h-[2.75rem]"
              >
                Subscribe
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Links */}
        <div className="border-t border-[#3A3841] mt-14 xl:mt-[3.75rem] pt-8 xl:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className='font-medium'>©2023 Tyme - Edit. All Rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm md:text-base font-medium hover:text-gray-400">Security</Link>
              <Link to="#" className="text-sm md:text-base font-medium hover:text-gray-400">Legal</Link>
              <Link to="#" className="text-sm md:text-base font-medium hover:text-gray-400">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 