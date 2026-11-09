-- CREATE TABLE employees (
--     id INT PRIMARY KEY,
--     name VARCHAR(100),
--     department VARCHAR(100),
--     salary INT
-- );

-- INSERT INTO employees (id, name, department, salary)
-- VALUES
--     (1, 'Andi', 'Engineering', 8000000),
--     (2, 'Budi', NULL, 6000000),
--     (3, 'Citra', 'Marketing', 7000000),
--     (4, 'Dina', NULL, 9000000),
--     (5, 'Eko', 'Engineering', 7500000);

SELECT 
COUNT(*) total_product,
SUM(price) total_price,
avg(price) average_product,
min(price) lowest_price_product,
max(price) highest_price_product
FROM products;