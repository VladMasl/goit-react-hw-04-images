import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import s from '../components/App.module.css';
 
class App extends Component {
  state = {
    searchName: '',
  };

  hendleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    return (
      <div className={s.appStyles}>
        <Searchbar hendleFormSubmit={this.hendleFormSubmit} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      </div>
    );
  }
}

export default App;
