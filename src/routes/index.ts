import { Router, Request, Response } from 'express';
import userRoutes from './users.routes';

const router = Router();

router.use('/users', userRoutes);

router.get('/', (req: Request, res: Response) => {
    res.send('router works!');
});

export default router;