import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const Home = lazy(() => import('./pages/home'));

function App() {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout.Content>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
