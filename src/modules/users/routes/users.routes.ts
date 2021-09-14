import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UserController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.get('/', isAuthenticated, usersController.index);

usersRoutes.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  usersController.show,
);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  usersController.create,
);

usersRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  usersController.update,
);

usersRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required } }),
  usersController.delete,
);

export { usersRoutes };
