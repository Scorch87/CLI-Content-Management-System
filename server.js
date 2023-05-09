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

viewDepartments();

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is listening on port ${PORT}`)
});
// need to:

// 1) View all departments
// presents a formatted table showing department names and department ids
const viewDepartments = ()=>{
    db.query('SELECT * FROM department', function(err, results) {
        if(err){
            console.log(err);
            return;
        }
        console.table(results);
    });
}

// 2) View all roles
// presented with the job title, role id, the department that role belongs to, and the salary for that role

// 3) View all employees
// presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// 4) Add a department
// prompted to enter the name of the department and that department is added to the database

// 5) Add a role
// prompted to enter the name, salary, and department for the role and that role is added to the database

// 6) Add an employee
// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// 7) Update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database