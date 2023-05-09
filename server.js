//use inquirer@8.2.4
const inquirer = require('inquirer');
// will need video submission
// mysql2 package
const mysql = require('mysql2');
const express = require('express');
// console.table package
const cTable = require('console.table');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);
// need to:

// 1) View all departments
// presents a formatted table showing department names and department ids
const viewDepartments = ()=>{
    db.promise().query('SELECT * FROM department;')
        .then(([rows, fields]) =>{
            console.table(rows);
        })
        .catch(console.log)
        .then(()=> init())
}

// 2) View all roles
// presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = ()=>{
    db.promise().query('SELECT * FROM role;')
        .then(([rows, fields]) =>{
            console.table(rows);
        })
        .catch(console.log)
        .then(()=> init())
}
// 3) View all employees
// presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = ()=>{
    db.promise().query('SELECT * FROM employee;')
        .then(([rows, fields]) =>{
            console.table(rows);
        })
        .catch(console.log)
        .then(()=> init())
}
// 4) Add a department
// prompted to enter the name of the department and that department is added to the database
const addDepartment = ()=>{
    inquirer.prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "department"
    }).then((data) =>{
        const sql = `INSERT INTO department (name) VALUES (?);`;
        db.promise().query(sql, data.department)
            .then(console.log(`The ${data.department} department has been added`))
            .then(()=> init())
    })
}

// 5) Add a role
// prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = ()=>{
    inquirer.prompt([{
        type: "input",
        message: "Enter the name of the new role",
        name: "role"
    }, {
        type: "number",
        message: "What is the salary for this position?",
        name: "salary"
    },{
        type:"input",
        message:"Which department does this role belong to?",
        name: "department"
    }]).then((data) =>{
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
        db.promise().query(sql, [data.role, data.salary, data.department])
        .then(console.log(`The ${data.role} role has been added`))
        .then(()=> init())
    })        
}

// addRole(['Administrative Assistant', 30000.00, 1]);

// 6) Add an employee
// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = ()=>{
    inquirer.prompt([{
        type: "input",
        message: "Enter the first name of the new employee",
        name: "first_name"
    }, {
        type: "input",
        message: "Enter the last name of the new employee",
        name: "last_name"
    },{
        type:"number",
        message:"Enter the id of the role this employee has",
        name: "role"
    },{
        type:"number",
        message:"Enter the id of the manager this employee has",
        name: "manager"
    }]).then((data) =>{
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
        db.promise().query(sql, [data.first_name, data.last_name, data.role, data.manager])
        .then(console.log(`${data.first_name} has been added as a new employee`))
        .then(()=> init())
    })
}

// addEmployee(['Jamal', 'Jones', 2, 1]);
// 7) Update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database

const updateEmployee = () => {
    inquirer.prompt([{
        type: "number",
        message: "Enter the id of the employee to be changed",
        name: "employee"
    }, {
        type: "number",
        message: "Enter the id of the new role",
        name: "role"
    }
    ]).then((data)=> {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.promise().query(sql, [data.role, data.employee])
        .then(console.log(`${data.employee} has been updated`))
        .then(()=> init())
    })
}

// updateEmployee([0,3]);
const prompts = [{
    type: "list",
    message: "Select the desired action",
    name: "action",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role", "Quit"]
}]

function init() {
    inquirer.prompt(prompts).then((data)=>{
        switch (data.action){
            case "View all departments":
                viewDepartments()
                break
            case "View all roles":
                viewRoles()
                break
            case "View all employees":
                viewEmployees()
                break
            case "Add a department":
                addDepartment()
                    break
            case "Add a role":
                addRole()
                    break
            case "Add an employee":
                addEmployee()
                break
            case "Update an employee's role":
                updateEmployee()
                break
            case "Quit":
                break
        }
    })
}

init();
app.listen(process.env.PORT || 3001, () => {
    console.log(`App is listening on port ${PORT}`)
});