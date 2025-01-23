import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 import { createGalleryCardTemple } from './js/render-functions';
 import { fetchPhotos } from "./js/pixabay-api";

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load');


load.style.display = 'none';

function onSearch(event) {
    event.preventDefault();
    
    gallery.innerHTML = '';
    load.style.display = 'block';
    const query = input.value.trim();
  
    if (query === '') {
        load.style.display = 'none';
        iziToast.warning({
      title: 'Warning',
            message: 'Please enter a search query!',
    });
    return;
    }

    
    fetchPhotos(query) 
        .then(data => {
             load.style.display = 'none';
            if (data.hits.length === 0) {
                iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
                });
                form.reset();
          return;
            
            }

            const markup = createGalleryCardTemple(data.hits);
            gallery.insertAdjacentHTML('beforeend', markup);  

            const lightbox = new SimpleLightbox('.gallery-item', {
               captions: true,
               captionsData: 'alt',
               captionDelay: 250,
            });
            lightbox.refresh(); 
            form.reset();
        })
        .catch(() => { error => load.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again later.',
      });
    });
}

form.addEventListener('submit', onSearch);