import express from "express"
import authenticateAccessToken from '../middlewares/authenticate'
import * as todoListController from '../controllers/todo-list.controllers'

const router = express.Router();

router.post("/", authenticateAccessToken, todoListController.getList);
router.post("/add-task", authenticateAccessToken, todoListController.addTask)
router.put("/complete/:id", authenticateAccessToken, todoListController.completeTask)
router.put("/recollect/:id", authenticateAccessToken, todoListController.recollectTask)
router.delete("/delete/:id", authenticateAccessToken, todoListController.deleteTask)
router.put("/update-task/:id", authenticateAccessToken, todoListController.updateTask)

export default router;
