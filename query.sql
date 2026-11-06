-- CREATE TABLE orders (
--     id INT PRIMARY KEY,
--     customer_name VARCHAR(100),
--     status VARCHAR(50),
--     total INT
-- );

-- INSERT INTO orders (id, customer_name, status, total)
-- VALUES
--     (1, 'Andi', 'completed', 100000),
--     (2, 'Budi', 'pending', 150000),
--     (3, 'Citra', 'completed', 200000),
--     (4, 'Dina', 'pending', 300000),
--     (5, 'Eko', 'completed', 250000);

SELECT status, sum(total)
FROM orders
GROUP BY status;