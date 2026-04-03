import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import PaymentModal from './components/PaymentModal';
import Home from './pages/Home';
import Events from './pages/Events';
import Merchandise from './pages/Merchandise';
import Membership from './pages/Membership';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import './styles/global.css';

function PageWrapper() {
  const { currentPage, adminEvents, adminMerchItems } = useApp();

  return (
    <div style={{ paddingTop: '70px' }}>
      {currentPage === 'home'       && <Home />}
      {currentPage === 'events'     && <Events adminEvents={adminEvents} />}
      {currentPage === 'merch'      && <Merchandise adminMerchItems={adminMerchItems} />}
      {currentPage === 'membership' && <Membership />}
      {currentPage === 'gallery'    && <Gallery />}
      {currentPage === 'contact'    && <Contact />}
      {currentPage === 'admin'      && <Admin />}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <PageWrapper />
      <PaymentModal />
      <Toast />
    </>
  );
}
