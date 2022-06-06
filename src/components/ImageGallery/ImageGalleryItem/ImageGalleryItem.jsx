import React from 'react';
// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { FaRegThumbsUp, FaRegEye, FaRegComments } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
}) => {
  return (
    <li className={s['item']}>
      <div>
        <div className={s['imgContainer']}>
          <img
            className={s['image']}
            src={webformatURL}
            alt={tags}
            loading="lazy"
          />
        </div>

        <div className={s['infoContainer']}>
          <p className={s['info']}>
            <b>
              <FaRegThumbsUp size={24} color="#b92b7e" />
            </b>
          </p>
          <b className={s['comments']}>{likes}</b>
          <p className={s['info']}>
            <b>
              <FaRegEye size={24} color="#b92b7e" />
            </b>
          </p>
          <b className={s['comments']}>{views}</b>
          <p className={s['info']}>
            <b>
              <FaRegComments size={24} color="#b92b7e" />
            </b>
          </p>
          <b className={s['comments']}>{comments}</b>
          <p className={s['info']}>
            <b>
              <FiDownload size={24} color="#b92b7e" />
            </b>
          </p>
          <b className={s['comments']}>{downloads}</b>
        </div>
      </div>
    </li>
  );
};

export default ImageGalleryItem;
