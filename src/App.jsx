import { useState, useEffect } from 'react';
import {
  foxAPI,
  allTeamsOption,
  searchProps,
  placeholderText,
  fetchNotOkMsg,
} from './constants';
import { findItemsInList } from './helpers/string';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import Sidebar from './components/Sidebar';
import SearchInput from './components/SearchInput';
import Dropdown from './components/Dropdown';
import EmployeeList from './components/EmployeeList';
import EmployeeOrgChart from './components/EmployeeOrgChart';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(allTeamsOption);
  const [isError, setiSError] = useState(false);

  useEffect(() => {
    const employeesURL = foxAPI.base + foxAPI.paths.employees;
    fetch(employeesURL)
      .then(res => {
        if (!res.ok) {
          throw Error(fetchNotOkMsg);
        }
        return res.json();
      })
      .then(json => {
        setEmployees(json.employees);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setIsLoading(false);
        setiSError(true);
      });
    return () => {
      setIsLoading(true);
      setiSError(false);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const trimmedSearchInput = searchInput.trim();
  const searchedEmployees =
    trimmedSearchInput !== ''
      ? findItemsInList(trimmedSearchInput, employees, searchProps)
      : employees;

  //reactive to search
  const filteredEmployees =
    selectedTeam === allTeamsOption
      ? searchedEmployees
      : searchedEmployees.filter(emp => emp.team === selectedTeam);

  const teamList = [
    allTeamsOption,
    ...new Set(searchedEmployees.map(emp => emp.team)),
  ];

  return (
    <div className='main-cont'>
      <>
        <Sidebar>
          <div className='input-cont'>
            <SearchInput
              searchInput={searchInput}
              onInputChange={setSearchInput}
              placeholder={placeholderText}
            />
            <Dropdown
              selectedOption={selectedTeam}
              optionList={teamList}
              onOptionSelect={setSelectedTeam}
            />
          </div>
          <EmployeeList employees={filteredEmployees} />
        </Sidebar>
        <DndProvider backend={HTML5Backend}>
          <EmployeeOrgChart
            employees={employees}
            setEmployees={setEmployees}
            selectedTeam={selectedTeam}
            setiSError={setiSError}
          />
        </DndProvider>
      </>
    </div>
  );
}

export default App;
