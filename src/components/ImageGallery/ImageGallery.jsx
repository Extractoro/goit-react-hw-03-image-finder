import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
// import PropTypes from 'prop-types';

export default function ImageGallery({ pictures }) {
  return (
    <ul className={s['gallery']}>
      {pictures.map(
        ({
          id,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
          largeImageURL,
        }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            likes={likes}
            views={views}
            comments={comments}
            downloads={downloads}
          />
        )
      )}
    </ul>
  );
}
