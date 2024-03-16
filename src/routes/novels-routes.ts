import { NovelsController } from '../controllers/novels-controllers';
import { Router } from 'express';
import auth_middleware from '../middlewares/auth-middleware';

const Novel = new NovelsController();
const router = Router();

router.use(auth_middleware);

router.get('/:title', Novel.get_novel);
router.put('/', Novel.create_novel);
router.post('/:title', Novel.update_novel);
router.delete('/:title', Novel.delete_novel);

export default router;
