import { Component } from 'react';
import { toast } from 'react-toastify';
import api from '../../ApiSearch/Api';
import Modal from 'components/Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    data: [],
    modalInfo: false,
    largeImageURL: '',
    totalHits: 0,
    page: 1,
    status: 'idle',
  };

  reset = () => {
    this.setState({ data: [], totalHits: 0, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevProps.searchName !== this.props.searchName) {
      this.reset();
      this.setState({ status: 'pending' });
      this.dataRequest();
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });

      this.moreDataRequest();
    }

    if (page > 1) {
      this.handleScroll();
    }
  }

  async moreDataRequest() {
    const { page } = this.state;
    const { searchName } = this.props;

    await api
      .dataRequestApi({ page, searchName })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`!!Erro!!`));
      })

      .then(data =>
        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
          totalHits: data.totalHits,
          status: 'resolved',
        }))
      )

      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  dataRequest() {
    const { page } = this.state;
    const { searchName } = this.props;

    api
      .dataRequestApi({ page, searchName })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`!!${searchName}!!`));
      })

      .then(data =>
        this.setState({
          data: data.hits,
          totalHits: data.totalHits,
          status: 'resolved',
        })
      )

      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ modalInfo }) => ({
      modalInfo: !modalInfo,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    const { data, error, status, modalInfo, largeImageURL, page, totalHits } =
      this.state;
    const totalPage = Math.ceil(totalHits / 12);
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
            <ImageGalleryItem data={data} toggleModal={this.toggleModal} />
          </ul>
          {totalPage > page && <Button cbOnClick={this.updatePage} />}
          {modalInfo && (
            <Modal ElementImgModal={largeImageURL} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
