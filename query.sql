
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


SELECT
    c.name,
    sum(o.total),
    count(*) as total_orders
FROM customers AS c
INNER JOIN orders AS o
    ON c.id = o.customer_id
GROUP BY c.name