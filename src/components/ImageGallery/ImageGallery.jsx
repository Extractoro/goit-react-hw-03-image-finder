import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ pictures, setInfoModal }) {
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
            setInfoModal={setInfoModal}
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

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
    })
  ).isRequired,
  setInfoModal: PropTypes.func.isRequired,
};
