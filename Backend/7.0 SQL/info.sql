/* CRUD = CREATE, READ, UPDATE, DELETE -
https://www.w3schools.com/sql/default.asp
*/

/* customers: */
CREATE TABLE customers(
id INT NOT NULL,
first_name STRING,
last_name STRING,
address STRING,
)

SELECT * FROM 'customers';




/* products: */
CREATE TABLE products(
id INT NOT NULL,
name STRING,
price MONEY,
PRIMARY KEY (id)
)

SELECT * FROM 'products';



/* Updating single values and adding columns: */
UPDATE products
SET stock = 32
WHERE id = 1


/* Delete: */
DELETE FROM products
WHERE id = 2


/* SQL realtionship: */
INSERT INTO products
VALUES (2, "pencil", 0.80, 12)


/* orders: */
id (PRIMARY) | order_number | customer_id, product_id (FORGEIN)

CREATE TABLE orders (
id INT NOT NULL,
order_number INT,
customer_id INT,
product_id INT,
PRIMARY KEY (id)
FORGEIN KEY (customer_id) REFRENCES customers (id)      //for establishing realtionship between 2 tables
FORGEIN KEY (product_id) REFRENCES products (id)      
)

SELECT * FROM 'orders';

INSERT INTO orders
VALUES (1, 4362, 2, 1)

/* Join together the parts of our tables where a particular find key matches - */
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
