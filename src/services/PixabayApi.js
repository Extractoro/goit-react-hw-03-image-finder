const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPictures(query, page) {
  const optionsApi = new URLSearchParams({
    key: '25714118-67c188788ca31de7bcc571353',
    q: query,
    image_type: 'photo',
    per_page: 12,
    orientation: 'horizontal',
    page: page,
  });

  const url = `${BASE_URL}?${optionsApi}`;
  const response = await fetch(url);
  return response.json();
}
