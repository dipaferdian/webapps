# SQL SELECT Learning Roadmap

## Goal

Menguasai SQL `SELECT` dari dasar hingga mampu membuat query kompleks untuk kebutuhan backend development dan data retrieval.

---

## Stage 1 — Basic SELECT

**Target:** Mampu mengambil data dari tabel dan menentukan kolom yang dibutuhkan.

- [x] `SELECT` — mengambil kolom tertentu
- [x] `SELECT *` — mengambil seluruh kolom
- [x] `FROM` — menentukan tabel sumber data

## Stage 2 — Filtering Data

**Target:** Mampu mengambil data berdasarkan kondisi tertentu.

- [x] `WHERE`
- [x] Comparison operators (`=`, `!=`, `>`, `<`, `>=`, `<=`)
- [x] `AND`
- [x] `OR`
- [x] `IN`
- [x] `BETWEEN`
- [x] `LIKE`
- [x] `IS NULL`
- [x] `IS NOT NULL`
- [x] `NOT`
- [x] Operator precedence (`AND` vs `OR`)
- [x] Multiple conditions

## Stage 3 — Sorting and Pagination

**Target:** Mampu mengurutkan dan membatasi hasil query.

- [x] `ORDER BY`
- [x] `ASC`
- [x] `DESC`
- [x] `LIMIT`
- [ ] `OFFSET`
- [ ] Pagination
- [ ] Multi-column sorting

## Stage 4 — Aggregate Functions

**Target:** Mampu menghasilkan informasi statistik dari sekumpulan data.

- [x] `COUNT()`
- [x] `SUM()`
- [x] `AVG()`
- [x] `MIN()`
- [x] `MAX()`
- [ ] `COUNT(DISTINCT column)`
- [ ] Aggregate functions with `WHERE`

## Stage 5 — Grouping Data

**Target:** Mampu mengelompokkan data dan melakukan agregasi berdasarkan kelompok.

- [x] `GROUP BY`
- [x] `HAVING`
- [ ] Multiple columns in `GROUP BY`
- [ ] `WHERE` vs `HAVING`
- [ ] Grouping with multiple aggregate functions
- [ ] Grouping multiple levels of data

## Stage 6 — JOIN

**Target:** Mampu mengambil data dari beberapa tabel yang saling berhubungan.

- [ ] Primary Key and Foreign Key
- [ ] `INNER JOIN`
- [ ] `LEFT JOIN`
- [ ] `RIGHT JOIN`
- [ ] `FULL OUTER JOIN`
- [ ] Multiple JOINs
- [ ] JOIN with filtering (`WHERE`)
- [ ] JOIN with aggregation
- [ ] Self JOIN

## Stage 7 — Subqueries

**Target:** Mampu menggunakan hasil query sebagai bagian dari query lainnya.

- [ ] Subquery in `WHERE`
- [ ] Subquery in `FROM`
- [ ] Subquery in `SELECT`
- [ ] `IN` with subquery
- [ ] `EXISTS`
- [ ] `NOT EXISTS`
- [ ] Correlated subquery

## Stage 8 — Set Operations

**Target:** Mampu menggabungkan hasil dari beberapa query.

- [ ] `UNION`
- [ ] `UNION ALL`
- [ ] `INTERSECT`
- [ ] `EXCEPT`

## Stage 9 — Conditional Expressions

**Target:** Mampu membuat kondisi dan menghasilkan nilai berbeda di dalam query.

- [ ] `CASE WHEN`
- [ ] Multiple conditions in `CASE`
- [ ] `COALESCE()`
- [ ] `NULLIF()`

## Stage 10 — Common Table Expressions (CTE)

**Target:** Mampu menyusun query kompleks agar lebih terstruktur dan mudah dibaca.

- [ ] `WITH`
- [ ] Multiple CTEs
- [ ] CTE with JOIN
- [ ] CTE with aggregation
- [ ] Recursive CTE

## Stage 11 — Window Functions

**Target:** Mampu melakukan perhitungan antarbaris tanpa menggabungkan baris seperti `GROUP BY`.

- [ ] `OVER()`
- [ ] `PARTITION BY`
- [ ] `ORDER BY` inside `OVER()`
- [ ] `ROW_NUMBER()`
- [ ] `RANK()`
- [ ] `DENSE_RANK()`
- [ ] `LAG()`
- [ ] `LEAD()`
- [ ] `SUM() OVER()`
- [ ] `AVG() OVER()`

## Stage 12 — Query Optimization

**Target:** Mampu memahami dan mengevaluasi performa query.

- [ ] `EXPLAIN`
- [ ] `EXPLAIN ANALYZE`
- [ ] Full Table Scan
- [ ] Index Scan
- [ ] Sequential Scan
- [ ] Understanding Index
- [ ] Composite Index
- [ ] Query Cost
- [ ] N+1 Query Problem
- [ ] Query optimization techniques

---

## Learning Rules

1. Belajar satu exercise dalam satu waktu.
2. Setiap exercise menggunakan tingkat kesulitan bertahap.
3. Setiap tabel baru harus disertai `CREATE TABLE` dan sample data.
4. Setiap syntax baru dijelaskan sebelum exercise.
5. Jika jawaban salah, perbaiki sendiri berdasarkan penjelasan dan hint.
6. Git commands diberikan setelah jawaban diverifikasi benar.

## Completion Goal

Mampu menulis query `SELECT` yang kompleks, membaca data dari beberapa tabel, melakukan agregasi, menggunakan subquery dan window functions, serta memahami cara mengevaluasi performa query.
