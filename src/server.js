import { createServer } from 'miragejs';
import { foxAPI } from './constants';
import { employeesData } from './data/employees';

createServer({
  routes() {
    const base = foxAPI.base;
    const urls = foxAPI.paths;

    this.namespace = base;
    this.get(urls.employees, () => employeesData, { timing: 1500 });

    /* employeeData is neither stateful nor persisted anywhere as we use
       id for lookup and it doesn't get changed in our app but if this is not 
       the case anymore, use a fake data layer or browser storage */
    this.patch(
      urls.employeeUpdate,
      (_, request) => {
        const attrs = JSON.parse(request.requestBody);
        const updatedEmployee = {
          ...employeesData.employees.find(emp => emp.id === attrs.employee.id),
          manager: attrs.newManager.id,
        };
        return { ...updatedEmployee };
      },
      /* default response time for methods in routes is 300ms in dev
         https://miragejs.com/docs/main-concepts/route-handlers/#timing */
      { timing: 0 }
    );
  },
});
