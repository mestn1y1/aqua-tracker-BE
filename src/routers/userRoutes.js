import express from 'express';
import * as userController from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userInfoUpdatedSchema } from '../validation/user.js';
import { getCurrentUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/current', authenticate, getCurrentUser);

userRouter.patch(
  '/edit',
  authenticate,
  upload.single('avatar'),
  validateBody(userInfoUpdatedSchema),
  userController.updateUserSettings,
);

export default userRouter;
