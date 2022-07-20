import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './components/Container/index';
import { Searchbar } from './components/Searchbar/index';
import { ImageGallery } from './components/ImageGallery/index';
import { getPic } from './services/api';
import { Loader } from 'components/Loader/index';
import { toast } from 'react-toastify';
import { PICS_PER_PAGE } from './constants/apiConstants';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [name, setName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        await getPic(name, currentPage).then(pics => {
          setPictures(prevPics => [...prevPics, ...pics.hits]);
          setTotalHits(pics.totalHits);
          setTotalPages(Math.ceil(pics.totalHits / PICS_PER_PAGE));
          setIsLoading(false);
          if (currentPage === 1 && pics.total > 0) {
            toast.success(`Found ${pics.total} images!!!`);
          } else if (pics.totalHits === 0) {
            toast.error(
              `Sorry, there are no images matching your search query. Please try again.`
            );
          }
        });
      } catch (error) {
        toast.error('Oops! Something went wrong!');
      }
    };
    if (name) {
      fetchPictures();
      setIsLoading(true);
    }
  }, [currentPage, name]);

  useEffect(() => {
    const CARD_HEIGHT = 325;
    if (pictures.length > 0 && currentPage > 1) {
      window.scrollBy({
        top: CARD_HEIGHT * 4,
        behavior: 'smooth',
      });
    }
  }, [currentPage, pictures.length]);

  const handleImageNameSubmit = searchName => {
    if (searchName !== name) {
      setName(searchName);
      setCurrentPage(1);
      setPictures([]);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    if (currentPage === totalPages - 1) {
      toast.error('End of gallery');
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={handleImageNameSubmit} />
      {pictures.length > 0 && (
        <ImageGallery
          pics={pictures}
          loadMore={loadMore}
          totalHits={totalHits}
        />
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
