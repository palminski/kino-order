require('dotenv').config();
import express, { Request, Response } from "express";
import mysql from 'mysql2/promise';
import cors from 'cors';

//create express application
const app:express.Application = express();
const PORT: number = 3000;

//MidleWare
app.use(cors());
app.use(express.json());

//Database Configuration
//remember to put .env in the root of the backend directory
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


// test routes
app.get('/', (req: Request, res: Response) => {
    res.send('This is an express server set up with typescript!');
});

app.get('/hello-world', (req: Request, res: Response) => {
    res.send('Hello World. using typescript on the backend!');
});

app.get('/data', async (req: Request, res: Response) => {
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

app.listen(PORT, () => {
    console.log(`
<><><><><><><><><><><><><><><><><><><><><><>


Server Started on http://localhost:${PORT};
    
    
<><><><><><><><><><><><><><><><><><><><><><>
`);
});