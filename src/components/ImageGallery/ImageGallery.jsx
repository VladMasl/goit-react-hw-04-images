import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../ApiSearch/Api';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import s from './ImageGallery.module.css';

function ImageGallery({ searchName }) {
  const [data, setData] = useState([]);
  const [modalInfo, setModalInfo] = useState(false);
  const [largeImageURL, seyLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const reset = () => {
    setData([]);
    setTotalHits(0);
    setPage(1);
  };

  // eslint-disable-next-line
  const dataRequest = () => {
    setStatus('pending');
    api
      .dataRequestApi(page, searchName)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`!!Erro!!`));
      })
      .then(data => {
        setData(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const updatePage = () => {
    setPage(prev => page + 1);
  };

  const handleScroll = () => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const toggleModal = largeImageURL => {
    setModalInfo(!modalInfo);
    seyLargeImageURL(largeImageURL);
  };

  const totalPage = Math.ceil(totalHits / 12);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    if (page === 1) {
      dataRequest();
    }
    reset();

    // eslint-disable-next-line
  }, [searchName]);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    dataRequest();
    handleScroll();
    // eslint-disable-next-line
  }, [page]);

  if (status === 'idle') {
    return <h1>Enter a request for the desired image</h1>;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return toast.info(error.message);
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={s.Gallery}>
          <ImageGalleryItem data={data} toggleModal={toggleModal} />
        </ul>
        {totalPage > page && <Button cbOnClick={updatePage} />}
        {modalInfo && (
          <Modal ElementImgModal={largeImageURL} onClose={toggleModal} />
        )}
      </>
    );
  }
}

export default ImageGallery;
