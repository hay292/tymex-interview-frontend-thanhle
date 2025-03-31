import React from 'react';
import { Button } from 'antd';
import phoneIcon from '../../assets/images/phone.svg';
import emailIcon from '../../assets/images/mail.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1D] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Section */}
          <div className="md:col-span-1">
            <h3 className="font-drone text-xl mb-4">NAVIGATION</h3>
            <div className="grid grid-cols-3 gap-2">
                <ul className="space-y-2">
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Home</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">About us</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Our teams</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Whitepaper</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Marketplace</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Roadmap</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">FAQs</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">News</a></li>
                  <li><a href="#" className="font-medium hover:text-pink-500 transition">Community</a></li>
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
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0 items-stretch">
              <input
                placeholder="Your email address"
                className="bg-transparent border border-white rounded-md py-2 px-3 text-white text-xs placeholder-[#89888B] h-[2.75rem] flex-1"
              />
              <Button
                type="primary"
                className="btn-gradient h-[2.75rem]"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Links */}
        <div className="border-t border-[#3A3841] mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className='font-medium'>©2023 Tyme - Edit. All Rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="font-medium hover:text-gray-400">Security</a>
              <a href="#" className="font-medium hover:text-gray-400">Legal</a>
              <a href="#" className="font-medium hover:text-gray-400">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 