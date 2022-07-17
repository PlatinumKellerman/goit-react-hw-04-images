import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './components/Container/index';
import { Searchbar } from './components/Searchbar/index';
import { ImageGallery } from './components/ImageGallery/index';
import { getPic, options } from './services/api';
import { Loader } from 'components/Loader/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [name, setName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const CARD_HEIGHT = 325;

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        await getPic(name, currentPage).then(pics => {
          setPictures(prevPics => [...prevPics, ...pics.hits]);
          setTotalPages(options.params.totalPages);
          setTotalHits(options.params.totalHits);
          setIsLoading(false);
          if (currentPage === 1 && pics.total > 0) {
            toast.success(`Found ${pics.total} images!!!`);
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
    if (currentPage > 1) {
      window.scrollBy({
        top: CARD_HEIGHT * 2,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  console.log(currentPage);

  const handleImageNameSubmit = searchName => {
    if (searchName !== name) {
      setName(searchName);
      setCurrentPage(1);
      setPictures([]);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    if (currentPage === totalPages) {
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
