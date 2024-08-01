const express = require("express");
const { Pool } = require("pg");
const inquirer = require("inquirer");
const { queryPool } = require("./lib/queries");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

pool.connect();

const { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee } =
  queryPool(pool);

async function handleViewDepts() {
  console.table(await viewDepts());
  mainMenu();
}

async function handleViewRoles() {
  console.table(await viewRoles());
  mainMenu();
}

async function handleViewEmployees() {
  console.table(await viewEmployees());
  mainMenu();
}

async function handleAddDept() {
  await addDept();
  mainMenu();
}

async function handleAddRole() {
  await addRole();
  mainMenu();
}

async function handleAddEmployee() {
  await addEmployee();
  mainMenu();
}

async function handleExit() {
  console.log("Goodbye");
  await pool.end();
  process.exit();
}

async function mainMenu() {
  // User will answer these questions in order to view or modify employee information
  try {
    const answer = await inquirer.prompt({
      type: "list",
      name: "categories",
      message: "Which would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Exit",
      ],
    });

    switch (answer.categories) {
      case "View all departments":
        handleViewDepts();
        break;
      case "View all roles":
        handleViewRoles();
        break;
      case "View all employees":
        handleViewEmployees();
        break;
      case "Add a department":
        handleAddDept();
        break;
      case "Add a role":
        handleAddRole();
        break;
      case "Add an employee":
        handleAddEmployee();
        break;
      case "Exit":
        handleExit();
        break;
      default:
        mainMenu();
        break;
    }
  } catch (err) {
    console.error(err);
  }
}

// Start the application
mainMenu();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
