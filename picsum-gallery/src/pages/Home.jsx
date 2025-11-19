import PhotoCard from '@/components/PhotoCard';
import Loader from '@/components/Loader';
import usePhotos from '@/hooks/usePhotos';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Home = () => {
  // Lấy toàn bộ data và logic từ custom hook usePhotos
  const { photos, loading, error, hasMore, loadPhotos } = usePhotos();

  // Hook trả về 1 cái ref để gắn vào phần tử cuối cùng
  const lastPhotoRef = useInfiniteScroll(loading, hasMore, loadPhotos);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          Lorem Gallery
        </h1>
        <p className="text-gray-500">Discover the world through Picsum Photos</p>
      </header>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Grid Ảnh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          // Kiểm tra xem đây có phải là ảnh cuối cùng không?
          if (photos.length === index + 1) {
            return (
              // Gắn ref vào thẻ bao ngoài của PhotoCard cuối cùng
              <div ref={lastPhotoRef} key={photo.id}>
                <PhotoCard photo={photo} />
              </div>
            );
          }
          return <PhotoCard key={photo.id} photo={photo} />;
        })}
      </div>

      {/* Khu vực Loading ở dưới cùng */}
      <div className="mt-8 h-20">
        {loading && <Loader />}
        {!hasMore && !loading && (
          <p className="text-center text-gray-400 italic">You have reached the end of the gallery.</p>
        )}
      </div>
    </div>
  );
};

export default Home;