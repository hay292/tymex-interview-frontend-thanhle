import './App.css';
import Header from './components/layout/Header';
import HeroHeaderSection from './components/HeroHeaderSection';
import Layout from './components/layout/Layout';
function App() {
  const handleConnectWallet = () => {
    console.log('Connect wallet clicked');
    // Add wallet connection logic here
  };

  return (
    <>
      <Header onConnectWallet={handleConnectWallet} />
      <HeroHeaderSection />
      <Layout />
    </>
  );
}

export default App;
