-- Creates the employee_db database --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Uses the employee_db database --
\c employee_db;

-- Add department table --
CREATE TABLE department (
  -- Creates a numeric column called "id" --
  id SERIAL PRIMARY KEY,
  -- Creates a string column called "name" which can hold up to 30 characters --
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Add role table --
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER REFERENCES department(id)
);

-- Add employee table --
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER REFERENCES role(id),

  -- to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager) --
  manager_id INTEGER REFERENCES employee(id)
);