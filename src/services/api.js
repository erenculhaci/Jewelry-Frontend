import axios from 'axios';

export const fetchProducts = async (query = '') => {
  const response = await axios.get(`https://jewelry-backend.netlify.app/.netlify/functions/api?${query}`);
  return response.data;
};
