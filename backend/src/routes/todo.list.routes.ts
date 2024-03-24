import express from "express";
import AuthenticateAccessToken from '../middlewares/authenticate'
import * as todoListController from '../controllers/todoList.controllers'

const router = express.Router();

router.get("/", AuthenticateAccessToken, todoListController.getList);
router.post("/add_task",AuthenticateAccessToken, todoListController.addTask)
router.delete("/complete/:id", AuthenticateAccessToken, todoListController.completeTask)
router.put("/update_task/:id", AuthenticateAccessToken, todoListController.updateTask)

export default router;