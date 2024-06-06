INSERT INTO department (name)
VALUES ('Management'), 
       ('Finance'),
       ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 80000, 1),
       ('Accountant', 60000, 2),
       ('HR Rep', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tabitha', 'Brown', 1, NULL ),
       ('Carl', 'Green', 2, 1),
       ('Peter', 'Duncan', 3, 1);