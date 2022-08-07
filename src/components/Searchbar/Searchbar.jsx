import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  hendleNameChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.error('Enter a request for the desired image!!!');
      return;
    }

    this.props.hendleFormSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="searchName"
            value={this.state.searchName}
            placeholder="Search images and photos"
            onChange={this.hendleNameChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
