const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');
const { viewDepts, viewEmployees, addRole, addEmployee } = require('./lib/queries');
require('dotenv').config();


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
    host: 'localhost',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
)

pool.connect();

async function employeeTracker() {

  // User will answer these questions in order to view or modify employee information
  inquirer.prompt({
      type: 'list',
      name: 'categories',
      message: 'Which would you like to do?',
      choices: [
        'View all departments',
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update employee role'],
    })
    .then((answer) => {
      switch(answer.categories) {
        case "View all departments":
          viewDepts();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        // case "Update employee role": UNCOMMENT WHEN READY TO USE
        //   updateEmployeeRole();
        //   break;
        case "Exit":
          console.log('Goodbye'),
          process.exit();
      }

      // Restart the menu
      employeeTracker();
    })
}

