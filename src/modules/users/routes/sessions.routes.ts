import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SessionsController } from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  sessionController.createToken,
);

export { sessionsRoutes };
