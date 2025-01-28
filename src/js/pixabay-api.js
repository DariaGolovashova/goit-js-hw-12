import axios from 'axios';

export class UnsplashAPI {
  #API_KEY = '48239935-17beded8a236fb1397b75b1c0';
  #BASE_URL = 'https://pixabay.com/api/';
  #query = '';

  async fetchPhotos( query, currentPage ) {
  const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=15`;

    try {
      const { data } = await axios.get(url);
      return data;
  
} 
    catch(error) {
      console.error('Error fetching images;', error); 
    throw error;

  }
  
}
  set query(newQuery) {
    this.#query = newQuery;
  }
  
   get query() {
    return this.#query;
  }
}
 

