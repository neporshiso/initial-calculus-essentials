INSERT INTO users
    (id, username, email, password)
VALUES
    (DEFAULT, 'Zach', 'zach@zach.com', 'zach'),
    (DEFAULT, 'Daniel', 'daniel@daniel.com', 'daniel'),
    (DEFAULT, 'Nep', 'nep@nep.com', 'nep');

INSERT INTO categories
    (id, name, description)
VALUES
    (DEFAULT, 'Arithmetic and Algebraic Operations', 'algebra'),
    (DEFAULT, 'Inequalities', 'inequalities'),
    (DEFAULT, 'Trigonometric Functions', 'trigonometry'),
    (DEFAULT, 'Logarithmic and Exponential Functions', 'logarithms');

INSERT INTO problems
    (id, problem_statement, problem_type, problem_answer, problem_solution, category_id)
VALUES
    (DEFAULT, 'sample problem statement', 'sample problem type (truefalse, manual_ordered, manual_unordered)', 'answer representation', 'simple answer to evaluate and compare', 'simple solution', 2);