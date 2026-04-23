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
 *             required:
 *               - titulo
 *               - conteudo
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
 */
router.post('/cadastro', authMiddleware, (req, res) => controller.insert(req, res));

/**
 * @openapi
 * /post/listagem:
 *   get:
 *     summary: Lista todos os posts
 *     tags:
 *       - Postagens
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/listagem', (req, res) => controller.findAll(req, res));

/**
 * @openapi
 * /post/listagem/ranking:
 *   get:
 *     summary: Ranking de posts por likes
 *     tags:
 *       - Postagens
 *     responses:
 *       200:
 *         description: Ranking retornado
 */
router.get('/listagem/ranking', (req, res) => controller.findTopLiked(req, res));

/**
 * @openapi
 * /post/listagem/{id}:
 *   get:
 *     summary: Buscar post por ID
 *     tags:
 *       - Postagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get('/listagem/:id', (req, res) => controller.findById(req, res));

/**
 * @openapi
 * /post/remover/{id}:
 *   delete:
 *     summary: Deletar post
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deletado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/remover/:id', authMiddleware, (req, res) => controller.delete(req, res));

/**
 * @openapi
 * /post/atualizar/{id}:
 *   put:
 *     summary: Atualizar post
 *     tags:
 *       - Postagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atualizado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.put('/atualizar/:id', authMiddleware, (req, res) => controller.update(req, res));

export default router;