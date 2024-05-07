import { Router, Request, Response } from 'express';
import userRoutes from './users.routes';
import novelsRoutes from './novels-routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/novels', novelsRoutes);
router.use('/google', userRoutes);

/**
 * @swagger
 * /:
 *  get:
 *    description: Use to test the router
 *    tags: [Index]
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 */
router.get('/', (req: Request, res: Response) => {
  res.send('router works!');
});

export default router;
