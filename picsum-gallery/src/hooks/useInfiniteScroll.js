import { useEffect } from 'react';

/**
 * Hook kích hoạt callback khi người dùng cuộn gần đến đáy trang
 * @param {Function} callback - Hàm sẽ chạy khi cuộn tới đáy
 * @param {boolean} isFetching - Trạng thái đang tải để chặn gọi trùng lặp
 */
const useInfiniteScroll = (callback, isFetching) => {
  useEffect(() => {
    const handleScroll = () => {
      // Nếu đang tải thì bỏ qua ngay
      if (isFetching) return;

      // Công thức kiểm tra vị trí cuộn
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      // Nếu còn cách đáy 300px thì gọi callback
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        callback();
      }
    };

    // Lắng nghe sự kiện scroll
    window.addEventListener('scroll', handleScroll);
    
    // Dọn dẹp sự kiện khi component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, isFetching]);
};

export default useInfiniteScroll;