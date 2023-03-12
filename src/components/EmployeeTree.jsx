import { TreeNode } from 'react-organizational-chart';
import EmployeeNode, { getEmployeeData } from './EmployeeNode';

function EmployeeTree({ childrenEmployees }) {
  return childrenEmployees.map(emp => {
    const employeeData = getEmployeeData(emp);
    const childNode = emp.children;

    return (
      <TreeNode
        key={emp.id}
        label={<EmployeeNode employeeData={employeeData} />}
      >
        {childNode.length > 0 ? (
          <EmployeeTree childrenEmployees={childNode} />
        ) : null}
      </TreeNode>
    );
  });
}

export default EmployeeTree;
