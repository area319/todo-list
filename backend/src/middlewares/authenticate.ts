import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import config from '../config'

export default function authenticateAccessToken( req:Request, res:Response, next:any){
    const authHeader = req.headers['authorization'];
    let token = authHeader?.split(' ')[1];
    if (token == undefined) {
        res.status(401).send("Authentication error.");
    }

    if(!token) {
        res.json({flag: -1,  message: 'Invalid access token'});
    }
    else {
        jwt.verify(token, config.jwtSecret, (err:any, data:any) => {
            if(err){
                res.json({flag: -1, message: err });
            }
            else{
                req.body.user = JSON.parse(data.id);
                next();
            }
        });
    }
}
