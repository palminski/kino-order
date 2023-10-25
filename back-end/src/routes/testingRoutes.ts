import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

// test routes
router.get('/', (req: Request, res: Response) => {
    res.send('This is an express server set up with typescript!');
});

router.get('/hello-world', (req: Request, res: Response) => {
    res.send('Hello World.');
});

module.exports = router;