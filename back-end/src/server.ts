require('dotenv').config();
import express, { Request, Response } from "express";

const routes = require('./routes');

import cors from 'cors';

//create express application
const app:express.Application = express();
const PORT: number = 3000;

//MidleWare
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());

app.use(routes);

//Database Configuration
//remember to put .env in the root of the backend directory


app.listen(PORT, () => {
    console.log(`
<><><><><><><><><><><><><><><><><><><><><><>


Server Started on http://localhost:${PORT};
    
    
<><><><><><><><><><><><><><><><><><><><><><>
`);
});