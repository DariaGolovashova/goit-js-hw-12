import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const createGalleryCardTemple = images=> {
    return images
        .map(
            ({ webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads }) =>
                    
        `<a href="${largeImageURL}" class="gallery-item">
        <div class = "img-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="img-info">
            <p class="img-info-item">Likes<span>${likes}</span></p>
            <p class="img-info-item">Views<span>${views}</span></p>
            <p class="img-info-item">Comments<span>${comments}</span></p>
            <p class="img-info-item">Downloads<span>${downloads}</span></p>
          </div>
          </div>
        </a>`
        )
        .join('');
    
}



