import { Request, Response } from 'express'
import * as todoListService from '../services/todo-list.services'

export async function getList(req: Request, res: Response) {
    try {
        const findRes = await todoListService.getWithFilter({userId: req.body.user._id,...req.body});
        res.status(200).json({ flag: 7, data: findRes });
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function addTask(req: Request, res: Response) {
    try {
        const saveRes = await todoListService.saveTodo({ ...req.body, author: req.body.user._id, 
            completeDate: new Date(), status: "pending" });
        res.status(200).json({ flag: 7, data: saveRes });
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function completeTask(req: Request, res: Response) {
    try {
        let completeRes = await todoListService.completeTask(req.params.id);
        if(completeRes == "No task") {
            //422 is semantic error.
            res.status(422).send("No task");
        } else {
            res.status(200).send(completeRes);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function recollectTask(req: Request, res: Response) {
    try {
        let recollectRes = await todoListService.recollectTask(req.params.id);
        if(recollectRes == 'No task') {
            res.status(422).send("No task");
        } else {
            res.status(200).send(recollectRes);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        let deleteRes = await todoListService.deleteTask(req.params.id);
        res.status(200).send({ flag: 7, data: deleteRes });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const updateRes = await todoListService.updateTask({todoId: req.params.id, updateData: req.body.updateData});
        res.status(200).send({ flag: 7, data: updateRes });
    } catch (err) {
        res.status(500).send(err);
    }
}
