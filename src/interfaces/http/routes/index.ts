import { Router } from 'express';
import usuarioRoutes from './Usuario/usuario.routes';

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;