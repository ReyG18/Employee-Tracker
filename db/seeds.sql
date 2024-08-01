INSERT INTO department (name)
VALUES ('IT'),
       ('HR'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Chief Information Officer (CIO)', 150000, 1),
       ('IT Manager', 100000, 1),
       ('Senior Software Engineer', 120000, 1),
       ('HR Manager', 90000, 2),
       ('Finance Manager', 95000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tabitha', 'Brown', 1, NULL ),
       ('Carl', 'Green', 2, 1),
       ('Peter', 'Duncan', 3, 2),
       ('Alice', 'Smith', 4, NULL),
       ('Bob', 'Johnson', 5, NULL);