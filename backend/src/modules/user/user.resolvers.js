import employeeService from "./user.service.js";

export default {
  Query: {
    employees: async (_, args, context) => {
      context.isAuthenticated();
      await context.checkPermission("can-view-employees");
      return employeeService.listEmployees(args);
    },
    employee: (_, { id }) => employeeService.getEmployee(id),
  },
  Mutation: {
    addEmployee: async (_, { input }, context) => {
      context.isAuthenticated();
      await context.checkPermission("can-add-employees");
      return employeeService.addEmployee(input);
    },

    updateEmployee: async (_, { input }, context) => {
      context.isAuthenticated();
      await context.checkPermission("can-edit-employees");
      return employeeService.updateEmployee(input);
    },
  },
};
