import router from 'routes';
import { NovelsController } from '../controllers/novels-controllers';
import { Router } from 'express';

const Novel = new NovelsController();

router.get('/:title', Novel.get_novel);
router.put('/', Novel.create_novel);
router.post('/:title', Novel.update_novel);
router.delete('/:title', Novel.delete_novel);

export default router;
