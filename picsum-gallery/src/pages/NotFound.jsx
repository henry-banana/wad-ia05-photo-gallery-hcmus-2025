import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number với gradient animation */}
        <div className="relative">
          <h1 className="text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-pulse leading-none">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4">
          Oops! Không tìm thấy trang này.
        </h2>
        <p className="text-gray-300 text-lg max-w-md mx-auto mb-10">
          Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển đi nơi khác.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="group relative px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
          >
            <span className="flex items-center gap-2">
              ← Quay lại
            </span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 font-medium transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              🏠 Về trang chủ
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-4 text-gray-500">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
