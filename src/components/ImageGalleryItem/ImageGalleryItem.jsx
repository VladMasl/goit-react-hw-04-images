import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { data } = this.props;
    const { toggleModal } = this.props;

    return data.map(el => (
      <li
        key={el.id}
        className={s.ImageItem}
        onClick={() => toggleModal({ largeImageURL: el.largeImageURL })}
      >
        <img className={s.ImageGalleryItemImage} src={el.webformatURL} alt="" />
      </li>
    ));
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
