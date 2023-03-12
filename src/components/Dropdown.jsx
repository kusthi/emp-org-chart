function Dropdown({ selectedOption, optionList, onOptionSelect }) {
  return (
    <div className='dropdown-cont'>
      <label htmlFor='emps'>Teams</label>
      <select
        id='emps'
        value={selectedOption}
        onChange={e => onOptionSelect(e.target.value)}
      >
        {optionList.map(choice => (
          <option key={choice}>{choice}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
