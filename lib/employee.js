// Create an Employee class
class Employee {
  constructor(first_name, last_name, role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
    };
  
  getFirstName() {
    return this.first_name;
  }
  getLastName() {
    return this.last_name;
  }
  getRoleId() {
    return this.role_id;
  }
  getManagerId() {
    return this.manager_id;
  }
}

module.exports = Employee;
