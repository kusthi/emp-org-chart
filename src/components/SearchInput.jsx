function SearchInput({ searchInput, onInputChange, placeholder }) {
  return (
    <div className='search-input-cont'>
      <input
        className='search-input'
        type='text'
        placeholder={placeholder}
        value={searchInput}
        onChange={e => onInputChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
