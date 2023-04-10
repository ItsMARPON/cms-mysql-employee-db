# MySQL2 Content Management Systems (CMS) Employee Tracker ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

I want to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL. This CMS will allow non-developers to easily view and interact with information stored in databases.

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Credits](#credits)

- [License](#license)

- [Badges](#badges)

- [Questions](#questions)

## Installation

Install Node.js version 16 <br />
Install MySQL2 <br />
Install Inquirer <br />
Install dotenv <br />
Install ascii-art <br />

## Usage

![Screenshot of MySQL2 CMS design command line](./assets/images/module12-cms-begin1.png) <br />
![Screenshot of MySQL2 CMS command line](./assets/images/module12-cms1.png) <br />

Video Walk through of using CMS Employee Tracker: ()<br />

In the command line of GitBash or Powershell, type the following to begin the CMS employee tracker:<br />
mysql -u root -p <br />
type your password <br />
source db/schema.sql; <br />
update employee information in seeds.sql file then source db/seeds.sql; <br />
source db/queries.sql; <br />
quit <br />
node index.js<br />

AS A business owner<br />
I WANT to be able to view and manage the departments, roles, and employees in my company<br />
SO THAT I can organize and plan my business<br />

GIVEN a command-line application that accepts user input <br />
WHEN I start the application <br />
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role <br />
WHEN I choose to view all departments<br />
THEN I am presented with a formatted table showing department names and department ids<br />
WHEN I choose to view all roles<br />
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role<br />
WHEN I choose to view all employees<br />
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to<br />
WHEN I choose to add a department<br />
THEN I am prompted to enter the name of the department and that department is added to the database<br />
WHEN I choose to add a role<br />
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database<br />
WHEN I choose to add an employee<br />
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database<br />
WHEN I choose to update an employee role<br />
THEN I am prompted to select an employee to update and their new role and this information is updated in the database<br />

## Credits

Credits to Ask BCS assistance and Calendly Tutors for assisting with code contributions and/or troubleshooting errors.

## License

MIT License (https://opensource.org/licenses/MIT)

## Badges

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Questions

Contact me with questions at the following links:
GitHub Username: itsMARPON
GitHub URL: https://github.com/ItsMARPON
Email: itsmaryyang@gmail.com
