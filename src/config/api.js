const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
const API_KEY1 = "66f298cd3e329ccb1842a72ee2fbe33d";

export const endpointPath = (country, category) =>
  `${API_DOMAIN}${country}&lang=hi&category=${category}&max=8&apikey=${API_KEY1}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}&lang=hi&max=8&apikey=${API_KEY1}`;
