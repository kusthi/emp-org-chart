function EmployeeList({ employees }) {
  return (
    <div className='emp-list-cont'>
      <ul className='emp-list'>
        {employees.map(employee => (
          <li key={employee.id}>
            <p className='emp-name'>{employee.name}</p>
            <p className='emp-desig'>{employee.designation}</p>
            <p className='emp-team'>{employee.team}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
