# [Employee Tracker](https://github.com/ReyG18/Employee-Tracker)

## Description

The Employee Tracker is a command-line application designed to manage a company's employee database with ease. Built using Node.js, Inquirer, and PostgreSQL, this tool allows you to view and manage departments, roles, and employees within your organization, helping you stay organized and efficient.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Future Developments](#future-developments)
- [Walkthrough Video](#walkthrough-video)
- [Contact Me](#contact-me)

## Installation

1. Clone this repository to your local machine.
2. Set up your .env using the .env.EXAMPLE template. Remove `.EXAMPLE` and add your own username and password.
3. Navigate to the root directory in your terminal and use `npm install`.
4. Use `psql -U <your-username>` in the terminal and enter your password when prompted.
5. Create the database with this command: `\i db/schema.sql`.
6. (Optional) Sample data is included for a test drive. Seed the data using the following command if you're interested: `\i db/seeds.sql`.

![Alt text](/images/employee-tracker-sample-data.png)

## Usage

To start the application, run the following command in your terminal:

```bash
npm start
```

Follow the prompts to view and manage departments, roles, and employees.

![Alt text](/images/employee-tracker-1.png)


## Features

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee

## Future Developments

The following features are currently in development. Stay tuned!

- Update employees
- Update employee managers.
- View employees by manager.
- View employees by department.
- Delete departments, roles, and employees.

## Walkthrough Video

[Walkthrough Video Link](https://drive.google.com/file/d/1UzYSMgJeuRIUF3oCBLUAp4qmglESKBeW/view) - A walkthrough video demonstrating the functionality of the Employee Tracker.

## Contact Me

If you have any questions or run into any issues, feel free to reach out.
