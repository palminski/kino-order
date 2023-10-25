import { Router, Request, Response } from "express";
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';


const router = Router();

//set up database connection
const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
const pool = mysql.createPool(databaseConfig);
const getConnection = async () => {
    return await pool.getConnection();
}

//GET routes ====================================================================
//get all usernames
router.get('/users', async (req: Request, res: Response) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.query('SELECT username FROM users');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({error: "Failure to connect to database"})
    }
    finally {
        connection.release();
    }
});

//POST routes ====================================================================
router.post('/add-user', async (req: Request, res: Response) => {
    console.log(req.body);
    // console.log("recieved");
    res.status(200).json({message: "Post request recieved"});
})
//create new user


//export the router with the routes assigned
module.exports = router;