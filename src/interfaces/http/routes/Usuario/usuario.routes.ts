import { Router } from 'express';
import { container } from 'tsyringe';
import { UsuarioController } from '../../controllers/UsuarioController';

const router = Router();

const controller = container.resolve(UsuarioController);

/**
 * @openapi
 * /usuarios/cadastro :
 *   post:
 *     summary: Cria um usuário
 *     description: Cria um novo usuário no sistema
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               nick:
 *                 type: string
 *               senha:
 *                 type: string
 *               confirmacaoSenha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno
 */
router.post('/cadastro', (req, res) => controller.insert(req, res));

export default router;