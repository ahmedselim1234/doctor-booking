import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './store';
import { LangProvider } from './i18n/LangContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/booking/:doctorId" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <LangProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LangProvider>
    </Provider>
  );
}
