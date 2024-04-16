import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import * as authServices from '../services/auth.services'
import { createToken } from '../utils/token'
import config from '../config'

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const resData = await authServices.findUsersByEmail(email)
        if (!resData.length) {
            res.status(200).json({
                message: "NO_USER",
            });
            return;
        }
        if (bcrypt.compareSync(password, resData[0].password)) {
            res.status(200).json({
                message: "Login successed",
                accessToken: createToken({ id: JSON.stringify(resData[0]) }, config.jwtSecret,
                    process.env.ACCESSTOKENROLE || '1'),
                refreshToken: createToken({ id: JSON.stringify(resData[0]) }, config.jwtSecret,
                    process.env.REFRESHTOKENROLE || '2')
            });
            return;
        }
        else {
            res.status(401).json({ message: "wrong password" });
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
}

export async function signup(req: Request, res: Response) {
    try {
        const resData = await authServices.findUsersByEmail(req.body.email);
        if (resData.length != 0) {
            res.status(200).send({
                flag: 1,
                message: "Already have user with same e-mail"
            });
            return;
        }
    } catch (err) {
        res.status(500).send(err);
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        await authServices.saveUser({ email: req.body.email, password: hash, role: 'user' });
        res.status(200).send({ flag: 7, message: "Success" });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function resetPassword(req: Request, res: Response) {
    try {
        const resData = await authServices.findUsersByEmail(req.body.email);
        if (resData.length == 0) {
            console.log("Can't find email.");
            res.status(200).json("Can't find email.");
            return;
        }
        if (bcrypt.compareSync(req.body.curPassword, resData[0].password)) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.newPassword, salt);
            resData[0].password = hash;
            resData[0].save();
            res.status(200).send('success');
        } else {
            console.log("Can't find email.");
            res.status(200).json("Wrong password.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAllUserData = async (req: Request, res: Response) => {
    if (req.body.user.role !== 'administrator') {
        res.status(500).json('Access denied');
        return;
    }
    try {
        const allUser = await authServices.getAllUser();
        res.status(200).json({ message: 'Success', data: allUser });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedData = await authServices.deleteUserWithId(req.params.id);
        res.status(200).send({ message: 'Success', data: deletedData });
    } catch (err) {
        res.status(500).json(err);
    }
}
