import { employees } from "./user.model.js";
import { nanoid } from "nanoid";

class EmployeeService {
  listEmployees({
    search,
    sortField,
    sortOrder = "asc",
    page = 1,
    limit = 10,
  }) {
    let data = [...employees];

    if (search) {
      const term = search.toLowerCase();
      data = data.filter(
        (e) =>
          e.name.toLowerCase().includes(term) ||
          e.class.toLowerCase().includes(term)
      );
    }
    console.log("sortField", sortField);

    if (sortField) {
      data.sort((a, b) => {
        const v1 =
          typeof a[sortField] === "string"
            ? a[sortField].toLowerCase()
            : a[sortField];

        const v2 =
          typeof b[sortField] === "string"
            ? b[sortField].toLowerCase()
            : b[sortField];

        if (sortOrder === "desc") return v1 < v2 ? 1 : -1;
        return v1 > v2 ? 1 : -1;
      });
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  }

  getEmployee(id) {
    return employees.find((e) => e.id === id);
  }

  addEmployee(input) {
    const newUser = { id: nanoid(), ...input };
    employees.push(newUser);
    return newUser;
  }

  updateEmployee(input) {
    const index = employees.findIndex((e) => e.id === input.id);
    if (index === -1) throw new Error("Employee not found");
    employees[index] = { ...employees[index], ...input };
    return employees[index];
  }

  findUserByEmail(email) {
    return employees.find((e) => e.email === email);
  }
}

export default new EmployeeService();
