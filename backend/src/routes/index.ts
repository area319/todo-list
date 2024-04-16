import { Router } from 'express'
import todoListRoutes from './todo.list.routes'
import authRoutes from './auth.routes'

const router = Router();

router.use('/todo-list', todoListRoutes);
router.use('/auth', authRoutes);

export default router;
