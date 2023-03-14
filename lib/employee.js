class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;

    if (typeof first_name !== "string" || !first_name.trim().length) {
      throw new Error(
        "Expected parameter 'first name' to be a non-empty string"
      );
    }
    if (typeof last_name !== "string" || !last_name.trim().length) {
      throw new Error(
        "Expected parameter 'last name' to be a non-empty string"
      );
    }
  }
  getId() {
    return this.id;
  }
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
