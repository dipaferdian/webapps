-- CREATE TABLE users (
--     id INT PRIMARY KEY,
--     name VARCHAR(100),
--     age INT,
--     city VARCHAR(100)
-- );

-- INSERT INTO users (id, name, age, city)
-- VALUES
--     (1, 'Andi', 22, 'Jakarta'),
--     (2, 'Budi', 25, 'Bandung'),
--     (3, 'Citra', 21, 'Surabaya'),
--     (4, 'Dina', 28, 'Jakarta'),
--     (5, 'Eko', 24, 'Yogyakarta');


SELECT * FROM users
where name LIKE 'A%'