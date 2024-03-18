CREATE TABLE secrets_users(
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100)
)


/*
//The original:
CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100)
)
*/



/*
"id"	"email"	"password"
1	"1@2.com"	"123"
*/