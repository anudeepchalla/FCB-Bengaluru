import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState({ visible: false, icon: '', message: '' });
  const [paymentModal, setPaymentModal] = useState({ open: false, itemName: '', price: '' });

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminMerchItems, setAdminMerchItems] = useState([]);

  const showPage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((icon, message) => {
    setToast({ visible: true, icon, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  const openPaymentModal = useCallback((itemName, price) => {
    setPaymentModal({ open: true, itemName, price });
  }, []);

  const closePaymentModal = useCallback(() => {
    setPaymentModal({ open: false, itemName: '', price: '' });
  }, []);

  return (
    <AppContext.Provider value={{
      currentPage, showPage,
      toast, showToast,
      paymentModal, openPaymentModal, closePaymentModal,
      isAdminLoggedIn, setIsAdminLoggedIn,
      adminEvents, setAdminEvents,
      adminMerchItems, setAdminMerchItems,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
