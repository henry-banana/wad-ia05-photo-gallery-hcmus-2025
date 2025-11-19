import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PhotoDetails from '../pages/PhotoDetails';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos/:id" element={<PhotoDetails />} />
        
        {/* Route 404 */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center text-2xl text-gray-400">
            404 - Page Not Found
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;