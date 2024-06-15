const inquirer = require("inquirer");
const { Pool } = require("pg");

function queryPool(pool) {
  // Function to view all Departments
  async function viewDepts() {
    const res = await pool.query("SELECT * FROM department");
    return res.rows;
  }

  // Function to view all roles
  async function viewRoles() {
    const res = await pool.query(`
      SELECT 
        role.id, 
        role.title, 
        role.salary, 
        department.name AS department
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    return res.rows;
  }

  // Function to view all employees
  async function viewEmployees() {
    const res = await pool.query(`
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department,
        role.salary,
        manager.first_name AS manager_first_name, 
        manager.last_name AS manager_last_name
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    return res.rows;
  }

  // Function to add a new department
  async function addDept() {
    const { deptName } = await inquirer.prompt([
      {
        type: "input",
        name: "deptName",
        message: "Enter department name:",
      },
    ]);
    const res = await pool.query(
      "INSERT INTO department (name) VALUES ($1) RETURNING *",
      [deptName]
    );

    console.log(`New department added: ${res.rows[0].name}`);
    return res.rows[0];
  }

  // Function to add a new role
  async function addRole() {
    const depts = await pool.query("SELECT * FROM department");
    const deptChoices = depts.rows.map(({ id, name }) => ({ name, value: id }));

    // Getting role details from user input
    const { roleTitle, roleSalary, deptId } = await inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter new role title:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter new role salary:",
      },
      {
        type: "list",
        name: "deptId",
        message: "Select a department for this role:",
        choices: deptChoices,
      },
    ]);

    // Insert the new role into the database
    const res = await pool.query(
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
      [roleTitle, roleSalary, deptId]
    );

    console.log(`New role added: ${res.rows[0].roleTitle}`);
    return res.rows[0];
  }

  // Function to add a new employee
  async function addEmployee() {
    // Selects roles to choose from
    const roles = await pool.query("SELECT * FROM role");
    const roleChoices = roles.rows.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    // Selects employees to assign as manager
    const employees = await pool.query(
      "SELECT id, first_name, last_name FROM employee"
    );
    const mgrChoices = employees.rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    // Getting new Employee details from user input
    const { newFirstName, newLastName, employeeRole, managerId } =
      await inquirer.prompt([
        {
          type: "input",
          name: "newFirstName",
          message: "First Name:",
        },
        {
          type: "input",
          name: "newLastName",
          message: "Last Name:",
        },
        {
          type: "list",
          name: "employeeRole",
          message: "Select a role:",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the manager:",
          choices: mgrChoices,
        },
      ]);

    // Inserts the new employee into the database
    const res = await pool.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [newFirstName, newLastName, employeeRole, managerId]
    );

    console.log(
      `Added employee: ${res.rows[0].first_name} ${res.rows[0].last_name}`
    );
    return res.rows[0];
  }

  return {
    viewDepts,
    viewRoles,
    viewEmployees,
    addDept,
    addRole,
    addEmployee
  };
}

module.exports = { queryPool };
