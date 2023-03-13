import { Tree } from 'react-organizational-chart';
import { buildTree, findPathFromRoot } from '../helpers/tree';
import { foxAPI, allTeamsOption, fetchNotOkMsg } from '../constants';
import {
  EmployeeTreeContext,
  SetEmployeesContext,
} from '../contexts/EmployeeTreeContext';
import EmployeeNode, { getEmployeeData } from './EmployeeNode';
import EmployeeTree from './EmployeeTree';

function EmployeeOrgChart({
  employees,
  setEmployees,
  selectedTeam,
  setiSError,
}) {
  const employeesForSelectedTeam = [
    ...getEmployeesForSelectedTeam(employees, selectedTeam),
  ];
  const employeeTree = buildTree(employeesForSelectedTeam);
  const root = employeeTree[0];
  const rootChildren = root.children;
  const rootData = getEmployeeData(root);

  function getEmployeesForSelectedTeam(employeeList, selectedTeam) {
    const rootTeam = employeeList.find(emp => emp.manager === null).team;
    const isAllorRootTeam =
      selectedTeam === allTeamsOption || selectedTeam == rootTeam;
    const selectedEmployees =
      selectedTeam === allTeamsOption
        ? employeeList
        : employeeList.filter(emp => emp.team === selectedTeam);

    return isAllorRootTeam
      ? selectedEmployees
      : removeDisConnectedRootTeamMemebers();

    function removeDisConnectedRootTeamMemebers() {
      const tree = buildTree(employeeList)[0];
      const pathList = [
        ...new Set(
          selectedEmployees
            .map(emp => [...findPathFromRoot(tree, emp.id)])
            .flat(1)
        ),
      ];
      return employeeList.filter(emp => pathList.includes(emp.id));
    }
  }

  function handleManagerUpdate(employee, newManager) {
    const employeesURL = foxAPI.base + foxAPI.paths.employeeUpdate;
    //this can be handled optimistically for a better UX
    fetch(employeesURL, {
      method: 'PATCH',
      body: JSON.stringify({ employee, newManager }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw Error(fetchNotOkMsg);
        }
        return res.json();
      })
      .then(json =>
        setEmployees(employees =>
          employees.map(emp => (emp.id === employee.id ? json : emp))
        )
      )
      .catch(err => {
        console.log(err.message);
        setiSError(true);
      });
  }

  return (
    <div className='emp-chart-cont'>
      <EmployeeTreeContext.Provider value={root}>
        <SetEmployeesContext.Provider value={handleManagerUpdate}>
          <Tree
            lineWidth={'3px'}
            lineColor={'#f1dede'}
            lineHeight={'25px'}
            label={<EmployeeNode employeeData={rootData} />}
          >
            <EmployeeTree childrenEmployees={rootChildren} />
          </Tree>
        </SetEmployeesContext.Provider>
      </EmployeeTreeContext.Provider>
    </div>
  );
}

export default EmployeeOrgChart;
