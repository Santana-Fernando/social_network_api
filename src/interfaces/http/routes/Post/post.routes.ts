import { Router } from 'express';
import { container } from 'tsyringe';
import { PostController } from '../../controllers/PostController';
import { authMiddleware } from '../../../../shared/utils/Middleware/authMiddleware';

const router = Router();

const controller = container.resolve(PostController);

/**
 * @openapi
 * /post/cadastro:
 *   post:
 *     summary: Cria uma postagem nova
 *     description: Cria um novo post no sistema
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */
router.post('/cadastro', authMiddleware, (req, res) => controller.insert(req, res));

export default router;