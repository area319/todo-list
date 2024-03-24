import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../config'
import { createToken } from '../utils/token';
import { User } from '../models/user.model'
import * as authServices from'../services/auth.services'

export async function login(req:Request, res:Response) {
    try{
        const res_data = await authServices.findUsersByEmail(req.body.email);
        if(res_data.length == 0){
            console.log("Can't find email.");
            res.status(422).json("Can't find email.");
        }
        if(bcrypt.compareSync(req.body.password, res_data[0].password)){
            res.status(200).json({
                flag: 7,
                message: "Login successed",
                accessToken: createToken({id: JSON.stringify(res_data[0])}, config.jwtSecret, '1d'),
                refreshToken: createToken({id: JSON.stringify(res_data[0])}, config.jwtSecret, '2d')
            });
        }
        else {
            console.log("Wrong password.");
            res.status(422).json("Wrong password");
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
}

export async function signup(req:any, res:any) {
    try {
        const res_data = await authServices.findUsersByEmail(req.body.email);
        if(res_data.length !=0 )
            res.status(422).send("Already have user with same e-mail");
    } catch(err) {
        res.status(500).send(err);
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        let res_data = await authServices.saveUser(req.body);
        console.log(res_data);
        res.status(200).send({status: 1, message: "Sucess"});
    } catch (err) {
        res.status(500).send(err);
    }
}
