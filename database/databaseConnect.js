import mysql from "mysql2";

const connectConfig ={
    host: process.env.HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}


const connection = mysql.createConnection(connectConfig)


export function handleGetPosts(req, res) {
    const address = req.body
    if(req.method === "GET"){
        connection.connect((err) =>{
            if(err){
                console.log(err)
                res.status(500).json({error: "Error connection to Database"})
            } else {
                console.log("Connected to database")


                const queryParams = `SELECT ${address} FROM users`

                connection.query(queryParams, (err, results) =>{
                    if(err) {
                        console.log(err)
                        res.status(500).json({error: "Error executing query"})
                    }else {
                        connection.end((err) => {
                            if (err) {
                              console.error("Error closing the database connection: ", err.message);
                            } else {
                              console.log("Database connection closed.");
                            }
                          });
                          res.status(200).json({data: results})
                    }
                })

            }
        })
    }else {
        res.status(405).json({error: "Method not allowed"})

    }
}