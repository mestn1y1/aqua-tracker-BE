import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { setWaterRateController } from '../controllers/water.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { setWaterDaylyNormShema, addWaterSchema } from './../validation/water.js';
import * as waterControllers from '../controllers/waterController.js';

const waterRouter = Router();

// use authenticate?
waterRouter.use(authenticate);

// response controllers

waterRouter.post(
  '/add-water',
  validateBody(setWaterDaylyNormShema),
  ctrlWrapper(setWaterRateController),
);
// роути Влада Б
waterRouter.get('/month', ctrlWrapper(waterControllers.getWaterByMonthController));
waterRouter.get('/day', ctrlWrapper(waterControllers.getWaterTodayController));
waterRouter.post('/add', validateBody(addWaterSchema), ctrlWrapper(waterControllers.addWaterController));
waterRouter.delete('/delete/:recordId', ctrlWrapper(waterControllers.deleteWaterController));

export default waterRouter;
