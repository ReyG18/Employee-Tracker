
// Functions to handle each menu action
// Each function performs a specific action and then calls the main menu to prompt the user for the next action.
// This was done to stop the main menu from restarting after every selection

function handlerFunctions(pool, queries, mainMenu) {
  const { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee } = queries;

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

  return {
    handleViewDepts,
    handleViewRoles,
    handleViewEmployees,
    handleAddDept,
    handleAddRole,
    handleAddEmployee,
    handleExit,
  };
}

module.exports = handlerFunctions;
