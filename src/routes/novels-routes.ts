import { NovelsController } from '../controllers/novels-controllers';
import { Router } from 'express';
import auth_middleware from '../middlewares/auth-middleware';

const Novel = new NovelsController();
const router = Router();

router.use(auth_middleware);

/**
 * @swagger
 * /novels/{title}:
 *   get:
 *     summary: Get a novel by title
 *     tags: [Novels]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique title of the novel
 *     responses:
 *       200:
 *         description: Novel object returned successfully
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              author:
 *               type: string
 *              summary:
 *               type: string
 *              rank:
 *               type: number
 *              status:
 *               type: string
 *              categories:
 *               type: array
 *              chapters:
 *               type: Number
 *              comments:
 *               type: array
 *       404:
 *         description: Novel not found
 */
router.get('/:title', Novel.get_novel);

/**
 * @swagger
 * /novels/{title}:
 *   put:
 *     summary: Update a new novel
 *     tags: [Novels]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              author:
 *               type: string
 *              summary:
 *               type: string
 *              rank:
 *               type: number
 *              status:
 *               type: string
 *              categories:
 *               type: array
 *              chapters:
 *               type: Number
 *              comments:
 *               type: array
 *     responses:
 *       201:
 *         description: Novel updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/:title', Novel.update_novel);

/**
 * @swagger
 * /novels:
 *   post:
 *     summary: Create a novel by title
 *     tags: [Novels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              author:
 *               type: string
 *              summary:
 *               type: string
 *              rank:
 *               type: number
 *              status:
 *               type: string
 *              categories:
 *               type: array
 *              chapters:
 *               type: Number
 *              comments:
 *               type: array
 *     responses:
 *       200:
 *         description: Novel created successfully
 *       404:
 *         description: Novel not found
 */
router.post('/', Novel.create_novel);

/**
 * @swagger
 * /novels/{title}:
 *   delete:
 *     summary: Delete a novel by title
 *     tags: [Novels]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique title of the novel to delete
 *     responses:
 *       200:
 *         description: Novel deleted successfully
 *       404:
 *         description: Novel not found
 */
router.delete('/:title', Novel.delete_novel);

export default router;
