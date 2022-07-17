import { ImageGalleryItem } from './ImageGalleryItem/index';
import { GalleryList } from './ImageGallery.styled';
import { LoadMoreButton } from '../LoadMoreButton/index';
import { Modal } from '../Modal/index';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function ImageGallery({ pics, loadMore, totalHits }) {
  const [isOpen, setIsOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const onModalOpen = largeImageURL => {
    setIsOpen(true);
    setLargeImage(largeImageURL);
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  const NumberOfPics = pics.length;
  return (
    <>
      <GalleryList>
        <ImageGalleryItem pics={pics} onModalOpen={onModalOpen} />
      </GalleryList>
      {NumberOfPics >= 12 && NumberOfPics < totalHits && (
        <LoadMoreButton loadMore={loadMore} text={'Load more'} />
      )}
      {isOpen && <Modal onClose={onModalClose} largeImageURL={largeImage} />}
    </>
  );
}

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  loadMore: PropTypes.func.isRequired,
};
