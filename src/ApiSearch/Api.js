const API_KEY = '28547634-4116209d61ca001bf4b221e9c';

const dataRequestApi = ( page, searchName ) => {
  const searchParams = new URLSearchParams({
    q: searchName,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  return fetch(`https://pixabay.com/api/?${searchParams}`);
};

const api = { dataRequestApi };

export default api;
