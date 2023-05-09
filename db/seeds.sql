INSERT INTO department (id, name)
VALUES (1, "Residence Life"),
        (2, "Student Activities");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "VP for Student Life", 95000.00, 1),
        (2, "Director of Residence Life", 60000.00, 1),
        (3, "Director of Student Conduct", 40000.00, 1),
        (4, "Asst Housing Coordinator", 35000.00, 1),
        (5, "Dean of Students", 95000.00, 2),
        (6, "Director of Student Activities", 40000.00, 2),
        (7, "Asst Dir of Student Activities", 30000.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Susan", "Gonzalez", 1, null),
        (2, "Ghee", "Buttersnaps", 2, 1),
        (3, "Jalapeno", "Jenkins", 3, 1),
        (4, "Lavender", "Gooms", 4, 2),
        (5, "Deon", "Richmond", 5, null),
        (6, "Squirts", "McIntosh", 6, 5),
        (7, "Galileo", "Humpkins", 7, 6);