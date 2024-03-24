import { Router } from 'express';
import todoListRoutes from './todo.list.routes';
import authRoutes from './auth.routes'

const router = Router();

router.use('/todo_list', todoListRoutes);
router.use('/auth', authRoutes);

export const MainRouter = router;
