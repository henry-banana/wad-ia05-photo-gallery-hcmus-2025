import { Link } from 'react-router-dom';

const PhotoCard = ({ photo }) => {
  // Tạo URL thumbnail (nhỏ) để load nhanh
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <Link to={`/photos/${photo.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Wrapper ảnh với tỷ lệ khung hình cố định (aspect-ratio) để tránh nhảy layout */}
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
          <img
            src={thumbnailUrl}
            alt={photo.author}
            loading="lazy" // Lazy load native
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Thông tin */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 truncate">{photo.author}</h3>
          <p className="text-xs text-gray-500 mt-1">ID: #{photo.id}</p>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;