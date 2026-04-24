import { Router } from 'express';
import { container } from 'tsyringe';
import { authMiddleware } from '../../../../shared/utils/Middleware/authMiddleware';
import { LikeController } from '../../controllers/LikeController';

const router = Router();

const controller = container.resolve(LikeController);

/**
 * @openapi
 * /reactions/like:
 *   post:
 *     summary: Curti
 *     tags:
 *       - Reacoes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *             properties:
 *               postId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Curtido
 *       401:
 *         description: Não autorizado
 */
router.post('/like', authMiddleware, (req, res) => controller.like(req, res));

/**
 * @openapi
 * /reactions/deslike:
 *   post:
 *     summary: Descurti
 *     tags:
 *       - Reacoes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *             properties:
 *               postId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Descurtido
 *       401:
 *         description: Não autorizado
 */
router.post('/deslike', authMiddleware, (req, res) => controller.deslike(req, res));

/**
 * @openapi
 * /reactions/listagem/{id}:
 *   get:
 *     summary: Buscar likes por ID de post
 *     tags:
 *       - Reacoes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Likes encontrados
 *       404:
 *         description: Postagem deve não existir
 */
router.get('/listagem/:id', (req, res) => controller.consult(req, res));

export default router;