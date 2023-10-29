import { Router, Request, Response } from "express";

const router = Router();
const testingRoutes = require('./testingRoutes');
const userRoutes = require('./userRoutes');

router.use('/testing', testingRoutes);
router.use('/database', userRoutes);

//For Incorrect Requests
router.use((req: Request, res: Response) => {
    res.status(404).end();
})

module.exports = router;

//list of routes fopr development
// => root/testing/add-user
// => root/testing/login-user
//{
//     "username":"postman",
//     "password":"password"
// }