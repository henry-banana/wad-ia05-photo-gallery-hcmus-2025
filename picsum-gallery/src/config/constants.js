const BASE_URL = import.meta.env.VITE_API_URL || "https://picsum.photos";
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export { BASE_URL, TIMEOUT };