import { Todo } from '../models/todo.model'
import {Request, Response} from 'express'

export async function getList(req: Request, res: Response) {
    try {
        let find_res = await Todo.find({author: req.body.user._id});
        res.status(200).json({flag: 7, data: find_res});
    } catch(err) {
        res.status(500).json(err);
    }
};

export async function addTask(req:Request, res: Response) {
    const new_todo = new Todo({...req.body, author: req.body.user._id});
    console.log(new_todo);
    try {
        const save_res = await new_todo.save()
        res.status(200).json({flag: 7, data: save_res});
    } catch(err) {
        res.status(500).json(err);
    }
}

export async function completeTask(req:Request, res:Response) {
    try{
        const del_res = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send({flag: 7, data: del_res});
    } catch(err) {
        res.status(500).send(err);
    }
}

export async function updateTask(req:Request, res:Response) {
    console.log(req.params, req.body);
    try {
        const upd_res = await Todo.findByIdAndUpdate(req.params.id, req.body.updateData);
        console.log(upd_res);
        res.status(200).send({flag:7, data: upd_res});
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}
