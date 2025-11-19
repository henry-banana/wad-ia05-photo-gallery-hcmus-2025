import { useState, useEffect, useCallback } from 'react';
import { fetchPhotoList } from '../services/picsumClient';

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Còn ảnh để tải không?

  const loadPhotos = useCallback(async () => {
    if (loading) return; // Chặn nếu đang tải

    setLoading(true);
    setError(null);

    try {
      // Gọi service
      const response = await fetchPhotoList({ page, limit: 20 });
      const newPhotos = response.data;

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        // Lọc ảnh trùng lặp (API Picsum thỉnh thoảng trả trùng ID)
        setPhotos((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewPhotos = newPhotos.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPhotos];
        });
        
        // Tăng page cho lần gọi sau
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError("Failed to load photos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, loading]); // Dependencies

  // Gọi lần đầu khi mount
  useEffect(() => {
    // Chỉ gọi nếu chưa có ảnh (lần đầu vào trang)
    if (photos.length === 0) {
      loadPhotos();
    }
  }, []);

  return { photos, loading, error, hasMore, loadPhotos };
};

export default usePhotos;