import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoDetails } from '@/services/picsumClient';
import Loader from '@/components/Loader';

const PhotoDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Hook để chuyển trang
  
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await fetchPhotoDetails(id);
        setPhoto(response.data);
      } catch (err) {
        setError("Could not fetch photo details.");
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center"><Loader /></div>;
  
  if (error || !photo) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-red-500 text-xl mb-4">{error || "Photo not found"}</p>
      <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Back Home</button>
    </div>
  );

  // URL ảnh chất lượng cao (Full HD)
  const fullHdUrl = `https://picsum.photos/id/${id}/1920/1080`;

  return (
    <div className="min-h-screen bg-white">
      {/* Nút Back nổi */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition-all font-medium text-gray-700"
      >
        &larr; Back
      </button>

      <div className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          
          {/* Ảnh lớn */}
          <div className="relative w-full aspect-video bg-gray-100">
            <img 
              src={fullHdUrl} 
              alt={photo.author} 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thông tin chi tiết */}
          <div className="p-8">
            {/* Photo Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {photo.title || `Photo by ${photo.author}`}
              </h1>
              {!photo.title && (
                <p className="text-sm text-gray-400 italic">No title available</p>
              )}
            </div>

            {/* Author */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Author
              </h2>
              <p className="text-xl text-gray-800 font-medium">{photo.author}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {photo.description || 
                  `Beautiful photo captured by ${photo.author}. This image showcases stunning photography with a resolution of ${photo.width}×${photo.height} pixels. Part of the Lorem Picsum collection, perfect for placeholder images and design mockups.`
                }
              </p>
            </div>

            {/* Technical Info & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-200">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500 mb-1">Original Resolution</p>
                <p className="text-lg font-mono font-semibold text-gray-800">
                  {photo.width} × {photo.height}
                </p>
              </div>
              
              <div className="flex gap-3">
                 <a 
                  href={photo.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View on Unsplash
                </a>
                <a 
                  href={photo.download_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Download Original
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;