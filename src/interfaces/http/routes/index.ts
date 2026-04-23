import { Router } from 'express';
import usuarioRoutes from './Usuario/usuario.routes';
import postRoutes from './Post/post.routes';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/post', postRoutes);

export default router;