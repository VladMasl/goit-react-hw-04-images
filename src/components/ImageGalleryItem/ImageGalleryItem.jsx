import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ data, toggleModal }) {
  return data.map((el,index) => (
    <li
      key={el.id+index}
      className={s.ImageItem}
      onClick={() => toggleModal({ largeImageURL: el.largeImageURL })}
    >
      <img className={s.ImageGalleryItemImage} src={el.webformatURL} alt="" />
    </li>
  ));
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
