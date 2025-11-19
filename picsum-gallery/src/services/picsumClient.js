import axios from "axios";
import { BASE_URL, TIMEOUT } from "@/config/constants";

/**
 * Cấu hình Axios Client dùng chung.
 * Giúp quản lý baseURL, timeout và headers tập trung tại một nơi.
 */
const picsumClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Lấy danh sách ảnh (có phân trang)
 * @param {Object} params
 * @param {number} params.page - Trang hiện tại (bắt đầu từ 1)
 * @param {number} params.limit - Số lượng ảnh mỗi trang
 */
export const fetchPhotoList = async ({ page = 1, limit = 30 }) => {
  // Gọi API: https://picsum.photos/v2/list?page=X&limit=Y
  return picsumClient.get("/v2/list", {
    params: { page, limit },
  });
};

/**
 * Lấy thông tin chi tiết của một ảnh
 * @param {string|number} id - ID của ảnh
 */
export const fetchPhotoDetails = async (id) => {
  // Gọi API: https://picsum.photos/id/{id}/info
  return picsumClient.get(`/id/${id}/info`);
};

export default picsumClient;