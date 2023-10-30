import { Router, Request, Response } from "express";
import mysql, { RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('Missing JWT secret!');
}

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
        res.status(500).json({ error: "Failure to connect to database" })
    }
    finally {
        connection.release();
    }
});

//POST routes ====================================================================
//add a user
router.post('/add-user', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        //validate data recieved
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required to add user" })
        }

        const connection = await getConnection();

        //check if user already exists
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM users WHERE username = '${username}'`);
        if (rows.length > 0) {
            console.log('user already exists')
            return res.status(409).json({ message: "Username already exists with this username" })
        }

        //hashpassword
        const hashedPassword: string = await bcrypt.hash(password, 10);
        //create user
        await connection.execute(`INSERT INTO users (username, hashed_password) VALUES (?,?)`, [username, hashedPassword]);
        console.log('user created successfully!');
        res.status(201).json({ message: 'user created successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//create new user
router.post('/login-user', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        //validate data recieved
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required to add user" })
        }

        //get connection and find specified user
        const connection = await getConnection();
        const [rows] = await connection.query<RowDataPacket[]>(`SELECT hashed_password FROM users WHERE username = '${username}'`);
        if (rows.length <= 0) {
            console.log("user doesn't exist");
            return res.status(409).json({ message: "user doesn't exist" })
        }

        //get hashed password
        const hashedPassword: string = rows[0].hashed_password;

        //check if password matches
        const passwordIsValid: boolean = await bcrypt.compare(password, hashedPassword);

        //check if this is the valid password
        if (!passwordIsValid) {
            return res.status(409).json({ message: "incorrect password" })
        }

        //login
        console.log(`login result => ${passwordIsValid}`);
        const token = jwt.sign({username}, jwtSecret, {expiresIn: '1h'});
        res.status(201).json({ message: 'user logged in successfully!', token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})



//export the router with the routes assigned
module.exports = router;