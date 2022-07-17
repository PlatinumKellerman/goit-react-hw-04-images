import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ pics, onModalOpen }) {
  return pics.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <GalleryItem key={id}>
        <GalleryImage
          onClick={() => {
            onModalOpen(largeImageURL);
          }}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        ></GalleryImage>
      </GalleryItem>
    );
  });
}

ImageGalleryItem.propTypes = {
  pics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onModalOpen: PropTypes.func.isRequired,
};
