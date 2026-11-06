-- CREATE TABLE products (
--     id INT PRIMARY KEY,
--     name VARCHAR(100),
--     price INT,
--     stock INT
-- );

-- INSERT INTO products (id, name, price, stock)
-- VALUES
--     (1, 'Laptop', 10000000, 5),
--     (2, 'Mouse', 150000, 10),
--     (3, 'Keyboard', 300000, 8),
--     (4, 'Monitor', 2000000, 4),
--     (5, 'Headset', 500000, 6);

SELECT min(price), max(price) FROM products