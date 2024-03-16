import { Router, Request, Response } from 'express';
import userRoutes from './users.routes';
import novelsRoutes from './novels-routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/novels', novelsRoutes);

router.get('/', (req: Request, res: Response) => {
  res.send('router works!');
});

export default router;
