import { Link, useNavigate } from 'react-router-dom';

/**
 * Layout chính của ứng dụng
 * Bao gồm Header cố định, nội dung động và Footer
 */
const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header cố định */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to="/"
            onClick={handleHomeClick}
            className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors"
          >
            📸 Picsum Pro
          </Link>
        </div>
      </header>

      {/* Nội dung chính thay đổi theo từng trang */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Picsum Gallery. Built with React & Tailwind.</p>
        <p className="mt-1 text-xs">Powered by <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Picsum Photos API</a></p>
      </footer>
    </div>
  );
};

export default MainLayout;
