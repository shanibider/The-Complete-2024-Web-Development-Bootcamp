// in order to connect to the DB with need some details to verify ourselfs.
// we need the host, port, database, user and password.
// we can get these details from the .env file.
// we can use the dotenv package to get these details.
// we can use the pg package to connect to the DB, and send queries to the DB.
//then we connect to the DB.
// then we can send queries to the DB, with db.query. and inside we can write SQL code (structured querey language).
//then we close the connection to the DB.
// and that is all we need to do to connect to the DB and send queries to it.

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




