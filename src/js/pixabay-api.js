const API_KEY = '48239935-17beded8a236fb1397b75b1c0';
const BASE_URL = 'https://pixabay.com/api/';


export function fetchPhotos(query) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url)
    .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
    })
    // .then(data => { console.log(data); })
    .catch(error => {
      // if (error.message == 404) { alert('Sorry, there are no images matching your search query. Please try again!'); }
      console.error('Error fetching images;', error); 
throw error;
      

   });

}



