"use client";
import React, {useState, useEffect, useContext} from "react";
import { ethers } from "ethers";

export const DatabaseContext = React.createContext()

export const DatabaseProvider = ({children}) =>{
    const [database, setDatabase] =useState()

    const connectConfig ={
        host: process.env.HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
   


    
    

    useEffect(()=>{
        
    }, [])

    return (
        <DatabaseContext.Provider value={({

        })} >
            {children}
        </DatabaseContext.Provider>
    )
}
 

export const useDatabaseContext = () => useContext(DatabaseContext)
