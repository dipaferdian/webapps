
-- CREATE TABLE customers (
--     id INT PRIMARY KEY,
--     name VARCHAR(100)
-- );

-- INSERT INTO customers (id, name)
-- VALUES
--     (1, 'Andi'),
--     (2, 'Budi'),
--     (3, 'Citra');

-- CREATE TABLE orders (
--     id INT PRIMARY KEY,
--     customer_id INT,
--     total INT
-- );

-- INSERT INTO orders (id, customer_id, total)
-- VALUES
--     (1, 1, 100000),
--     (2, 2, 150000),
--     (3, 1, 200000);


select 
c.name,
o.total
FROM customers as c
JOIN orders as o ON o.customer_id = c.id