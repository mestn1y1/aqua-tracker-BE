import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { userRegisterSchema, userLoginSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userRegisterSchema),
  ctrlWrapper(authController.registerController),
);

authRouter.post(
  '/signin',
  validateBody(userLoginSchema),
  ctrlWrapper(authController.loginController),
);

authRouter.post('/logout', ctrlWrapper(authController.logoutController));

authRouter.post('/refresh', ctrlWrapper(authController.refreshController));

export default authRouter;
