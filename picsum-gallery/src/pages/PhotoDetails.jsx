import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoDetails } from '../services/picsumClient';
import Loader from '../components/Loader';

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{photo.author}</h1>
                <p className="text-gray-500 mt-1">
                  Original Resolution: <span className="font-mono">{photo.width} x {photo.height}</span>
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-3">
                 <a 
                  href={photo.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Unsplash Page
                </a>
                <a 
                  href={photo.download_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Download
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