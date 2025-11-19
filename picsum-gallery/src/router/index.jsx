import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import PhotoDetails from '@/pages/PhotoDetails';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/layouts/MainLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Bọc Layout ra ngoài Routes */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;