-- CREATE TABLE sales (
--     id INT PRIMARY KEY,
--     region VARCHAR(50),
--     category VARCHAR(50),
--     amount INT
-- );

-- INSERT INTO sales (id, region, category, amount)
-- VALUES
--     (1, 'Jakarta', 'Electronics', 5000000),
--     (2, 'Jakarta', 'Furniture', 3000000),
--     (3, 'Bandung', 'Electronics', 4000000),
--     (4, 'Bandung', 'Furniture', 2000000),
--     (5, 'Jakarta', 'Electronics', 6000000),
--     (6, 'Bandung', 'Electronics', 7000000);

SELECT 
region,
category,
count(*),
sum(amount)
from sales
GROUP BY region, category



SELECT * from sales