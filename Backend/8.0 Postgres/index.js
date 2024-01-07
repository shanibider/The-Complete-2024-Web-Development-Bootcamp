// in order to connect to the DB we need some details to verify ourselfs.
// I use pg package to connect to the DB, and send queries to the DB.
// then I connect to the DB, send queries to the DB, with db.query. with SQL code inside (structured querey language).
// i use PostgreSQL server, with pgAdmin DB.


import Client from 'pg';

const db = new Client({
    host: "localhost",
    port: 5432,
    database: "world",
    user: "postgres",
    password: "123456",
    });

    db.Connect();

    db.query('SELECT * FROM users', (err, res) => {
        if (err){
            console.error("Error", err.stack);
        } else {
            console.log("user data:", res.rows);
        }
        db.end();
    });




