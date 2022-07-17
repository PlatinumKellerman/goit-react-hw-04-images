import { LoadButton } from './LoadMoreButton.styled';
import PropTypes from 'prop-types';

export const LoadMoreButton = ({ loadMore, text }) => {
  return (
    <>
      <LoadButton onClick={loadMore}>{text}</LoadButton>
    </>
  );
};

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
