const express = require("express");
const { Pool } = require("pg");
const inquirer = require("inquirer");
const { queryPool } = require("./lib/queries");
const handlerFunctions = require("./lib/handlers");
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

const queries = queryPool(pool);

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
        handlers.handleViewDepts();
        break;
      case "View all roles":
        handlers.handleViewRoles();
        break;
      case "View all employees":
        handlers.handleViewEmployees();
        break;
      case "Add a department":
        handlers.handleAddDept();
        break;
      case "Add a role":
        handlers.handleAddRole();
        break;
      case "Add an employee":
        handlers.handleAddEmployee();
        break;
      case "Exit":
        handlers.handleExit();
        break;
      default:
        mainMenu();
        break;
    }
  } catch (err) {
    console.error(err);
  }
}

// Initialize handler functions with mainMenu callback
const handlers = handlerFunctions(pool, queries, mainMenu);

// Start the application
mainMenu();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
