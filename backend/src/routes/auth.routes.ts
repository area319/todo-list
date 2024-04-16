import express from "express"
import * as authController from '../controllers/auth.controllers'
import authenticateAccessToken from "../middlewares/authenticate";

const router = express.Router();

router.post("/login", authController.login);
router.post('/signup', authController.signup);
router.put('/resetPassword', authController.resetPassword);
router.get('/get-all-user-data', authenticateAccessToken, authController.getAllUserData);
router.delete('/deleteUser/:id', authController.deleteUser);

export default router;
