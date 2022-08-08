import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../components/App.module.css';

function App() {
  const [searchName, setSearchName] = useState('');

  return (
    <div className={s.appStyles}>
      <Searchbar hendleFormSubmit={setSearchName} />
      <ImageGallery searchName={searchName} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
