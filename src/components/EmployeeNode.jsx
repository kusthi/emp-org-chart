import { useDrop, useDrag } from 'react-dnd';
import { findNode, isPathAvailable } from '../helpers/tree';
import { reactDnDTypes } from '../constants';
import {
  EmployeeTreeContext,
  SetEmployeesContext,
} from '../contexts/EmployeeTreeContext';
import { useContext } from 'react';

export default function EmployeeNode({ employeeData }) {
  const employeeTree = useContext(EmployeeTreeContext);
  const setEmployees = useContext(SetEmployeesContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: reactDnDTypes.employee,
    item: {
      data: employeeData,
    },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: reactDnDTypes.employee,
    drop: item => onDrop(item),
    canDrop: item => isDroppable(item),
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  function isDroppable(item) {
    const empId = item.data.id;
    const empManagerId = item.data.manager;
    const newManagerId = employeeData.id;
    return (
      empId !== newManagerId &&
      empManagerId !== newManagerId &&
      !isPathAvailable(findNode(employeeTree, empId), newManagerId)
    );
  }

  function onDrop(item) {
    setEmployees(item.data, employeeData);
  }

  const isActive = isOver && canDrop;

  const baseClass = 'emp-cont';
  const draggingList = baseClass.concat(' emp-drag');
  const canDropList = baseClass.concat(' emp-droppable ');
  const isActiveList = canDropList.concat(' emp-drop-active');

  function getClassList() {
    if (isDragging) {
      return draggingList;
    }
    if (isActive) {
      return isActiveList;
    }
    if (canDrop) {
      return canDropList;
    }

    return baseClass;
  }

  return (
    <div
      className={getClassList()}
      ref={employeeData.manager !== null ? node => drag(drop(node)) : drop}
    >
      <p>{employeeData.name}</p>
      <p>{employeeData.designation}</p>
    </div>
  );
}

export function getEmployeeData(emp) {
  return {
    id: emp.id,
    name: emp.name,
    designation: emp.designation,
    manager: emp.manager,
  };
}
