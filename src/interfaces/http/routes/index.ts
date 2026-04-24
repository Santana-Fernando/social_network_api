import { Router } from 'express';
import usuarioRoutes from './Usuario/usuario.routes';
import postRoutes from './Post/post.routes';
import likeRoutes from './Like/like.routes';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/post', postRoutes);
router.use('/reactions', likeRoutes);

export default router;