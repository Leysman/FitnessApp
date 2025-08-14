import styles from './SearchBar.module.scss';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ( { placeholder, value, onChange } ) => {


  const handleInput = e => {
    e.preventDefault();
    onChange(e.target.value);
  };


  return (
    <>
      <div className={styles.searchBar} >
        <FiSearch size={20} className={styles.icon} />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
        />
      </div> 
    </>
  );
}

export default SearchBar;