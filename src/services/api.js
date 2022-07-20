import axios from 'axios';
import {
  API_KEY,
  BASE_URL,
  IMAGE_TYPE,
  ORIENTATION,
  SAFESEARCH,
  PICS_PER_PAGE,
} from '../constants/apiConstants';

export async function getPic(name, currentPage) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: name,
      page: currentPage,
      image_type: IMAGE_TYPE,
      orientation: ORIENTATION,
      safe_search: SAFESEARCH,
      per_page: PICS_PER_PAGE,
    },
  });
  return response.data;
}
