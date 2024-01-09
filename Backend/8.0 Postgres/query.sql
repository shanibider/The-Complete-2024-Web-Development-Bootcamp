/*
Client ask the server for service, and the server handle those requests.
There is also buisness logic in the App , that talk to the DB (app.js), that stores emails, passwords, posts.

We have npm packages that help us work with postgres ("pg").

I will install: "postgres server", and "pgAdmin".
https://sbp.enterprisedb.com/getfile.jsp?fileid=1258649
*/

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT, 
    is_cool BOOLEAN
    );

/* Create a table in Postgres and importing csv file*/
CREATE TABLE capitals (
    id SERIAL PRIMARY KEY,
    country VARCHAR(45),
    capital VARCHAR(45)
    );

/* when we click on view/edit data->all rows, on capitals table in pgAdmin, it create for us this code*/
SELECT * FROM public.capitals;
ORDER BY id ASC;

/* import csv file- right click on the table->import capital.excel->check "header"*/


CREATE TABLE flags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45),
    flag TEXT
);



CREATE TABLE world_food(
    id SERIAL PRIMARY KEY,
    country VARCHAR(45),
    rice_production FLOAT,
    wheat_production FLOAT
);



/* Query data using SELECT, WHERE, and LIKE -
import world_food table in pgAdmin.
and insert using Query Tool (new query).
*/
INSERT INTO world_food (country, rice_production, wheat_production)
VALUES ('Italy', 1.46, 7.3)




CREATE TABLE countries(
    id SERIAL PRIMARY KEY,
    country_code CHAR (2),
    country_name VARCHAR(100)
);


CREATE TABLE visited_countries(
  id SERIAL PRIMARY KEY,
    country_code CHAR (2)
);


/*
"FR"
"DE"
"GR"
"IL"
"IT"
"NL"
"US"
"SZ"
"AT"
"BG"
*/