import { NextResponse, NextRequest } from "next/server";
import { connection } from "../../../../../../database/databaseConnect";

export default function handler(req, res){
    const address = req.body.address
    if(req.method == "GET"){
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
        res.status(405).json({error: "Not authorized method"})
    }
    
}