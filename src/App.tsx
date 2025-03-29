import './App.css';
import Header from './components/Header';
import HeroHeaderSection from './components/HeroHeaderSection';

function App() {
  const handleConnectWallet = () => {
    console.log('Connect wallet clicked');
    // Add wallet connection logic here
  };

  return (
    <>
      <Header onConnectWallet={handleConnectWallet} />
      <HeroHeaderSection />
    </>
  );
}

export default App;
