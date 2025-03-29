import headerCharacter from '../assets/images/header-character.svg';
import yellowBackground from '../assets/images/yellow-background.svg';
import newArrival from '../assets/images/new-arrival.svg';

const HeroHeaderSection = () => {
  return (
    <div className='relative overflow-hidden'>
      {/* Hero section with dark background */}
      <div
        className='w-full bg-gradient-to-r from-gray-900 to-indigo-950 relative bg-[#000000B2]
        bg-[url(assets/images/header-back-ground.webp)] bg-blend-multiply 
        bg-cover bg-center max-h-[50rem] flex'
      >
        <div className='w-[70%] flex-initial h-auto flex justify-center items-center md:pb-40'>
          <img src={newArrival} alt='new-arrival' className='w-[68rem] h-[18rem] p-6' />
        </div>
        <div className='w-[25%] flex-initial h-auto flex justify-end items-end z-10 md:pt-[10rem]'>
          <img src={headerCharacter} alt='header-character' className='w-[29rem] h-auto' />
        </div>
        <div className='w-full bg-gradient-to-r from-gray-900 to-indigo-950 max-h-[19rem] absolute bottom-0'>
          <img src={yellowBackground} alt='yellow-background' className='w-full h-auto' />
        </div>
      </div>
    </div>
  );
};

export default HeroHeaderSection;
