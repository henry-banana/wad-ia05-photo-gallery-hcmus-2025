import { useCallback, useRef } from 'react';

/**
 * Hook trả về một 'ref' để gắn vào phần tử cuối cùng của danh sách.
 * Khi phần tử đó xuất hiện, hàm 'callback' sẽ được gọi.
 * @param {boolean} loading - Trạng thái đang tải
 * @param {boolean} hasMore - Còn dữ liệu để tải hay không
 * @param {Function} callback - Hàm sẽ chạy khi phần tử xuất hiện
 */
const useInfiniteScroll = (loading, hasMore, callback) => {
  const observer = useRef();

  const lastElementRef = useCallback((node) => {
    if (loading) return; // Đang tải thì không làm gì cả
    
    // Ngắt theo dõi phần tử cũ
    if (observer.current) observer.current.disconnect();

    // Tạo observer mới
    observer.current = new IntersectionObserver((entries) => {
      // Nếu phần tử xuất hiện trong viewport và còn dữ liệu
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    });

    // Bắt đầu theo dõi phần tử mới (node)
    if (node) observer.current.observe(node);
  }, [loading, hasMore, callback]);

  return lastElementRef;
};

export default useInfiniteScroll;