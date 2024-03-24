import { add } from 'lodash';
import config from '../config';
import * as jwt from 'jsonwebtoken'
import { request } from 'https';
import { Request, Response } from 'express';

export default function AuthenticateAccessToken( req:any, res:any, next:any){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(token === null){
        res.json({flag: -1,  message: 'Invalid access token'});
    }
    else{
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

