class Role {
    constructor(id, title, salary, department_id){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;

    }
    getId(){
        return this.id;
    }
    getTitle(){
        return this.title;
    }
    getSalary(){
        return this.salary;
    }
    getDepartmentId(){
        return this.department_id;
    }
}

module.exports = Role;