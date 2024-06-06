const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');
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

