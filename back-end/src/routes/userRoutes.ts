import { Request, Response } from "express";
import { Router } from "express";
import mysql from 'mysql2/promise';

const router = Router();

const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log(databaseConfig);

const pool = mysql.createPool(databaseConfig);

const getConnection = async () => {
    return await pool.getConnection();
}



router.get('/data', async (req: Request, res: Response) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({error: "Failure to connect to database"})
    }
    finally {
        connection.release();
    }
});

module.exports = router;