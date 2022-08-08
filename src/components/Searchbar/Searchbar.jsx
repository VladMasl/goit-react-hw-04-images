import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

function Searchbar({ hendleFormSubmit }) {
  const [searchName, setSearchName] = useState('');
  const hendleNameChange = e =>
    setSearchName(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      toast.error('Enter a request for the desired image!!!');
      return;
    }

    hendleFormSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          name="searchName"
          value={searchName}
          placeholder="Search images and photos"
          onChange={hendleNameChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
