import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 import { createGalleryCardTemple } from './js/render-functions';
 import { UnsplashAPI } from "./js/pixabay-api";

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load');
document.addEventListener('DOMContentLoaded', () => {
  load.style.display = 'none'; 
});
const loadMoreButton = document.querySelector('.load-more-btn');


const api = new UnsplashAPI();

let currentPage = 1;
let currentQuery = '';
let lightbox;


async function onSearch(event) {
  try {
    event.preventDefault();
    gallery.innerHTML = '';
    load.style.display = 'block';
    currentPage = 1;
    loadMoreButton.style.display = 'none';
    const query = input.value.trim();
    currentQuery = query;
  
    if (query === '') {
         load.style.display = 'none';
        iziToast.warning({
      title: 'Warning',
            message: 'Please enter a search query!',
    });
    return;
    }

    loadMoreButton.classList.add('is-hidden');
    const data = await api.fetchPhotos(query, currentPage);
    load.style.display = 'none';
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
      title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return; 
    }


    gallery.insertAdjacentHTML('beforeend', createGalleryCardTemple(data.hits));
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh(); 
    }
    
    iziToast.success({
      title: 'Success',
      message: `Found ${data.totalHits} images!`,
    })
    
      if (data.totalHits > currentPage *15) {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again later.',
    });
  } finally {
    form.reset();
  }
}     

async function onLoadMore() {
  currentPage += 1;

  try {
     load.style.display = 'block'; 
    const data = await api.fetchPhotos(currentQuery, currentPage);
    if (data.hits && data.hits.length > 0) {
      renderGallery(data.hits);

   
      if (currentPage * 15 >= data.totalHits) {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
        loadMoreButton.style.display = 'none';
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'No more images found.',
      });
    }
  }  catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  }finally {
    load.style.display = 'none';  
  }
}

function renderGallery(images) {
  const markup = createGalleryCardTemple(images);
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item', 
      {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }


  const { height: cardHeight } = gallery
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

