export const foxAPI = {
  base: 'api.fox.org',
  paths: {
    employees: '/employees',
    employeeUpdate: '/employee/update',
  },
};

export const allTeamsOption = 'All';
export const searchProps = ['name', 'designation', 'team'];
export const placeholderText = 'Search by' + ' ' + searchProps.join(',' + ' ');
export const searchTypes = {
  exact: 'EXACT',
  partial: 'PARTIAL',
};
export const reactDnDTypes = {
  employee: 'EMPLOYEE',
};
export const fetchNotOkMsg = 'Could not fetch the requested data';
