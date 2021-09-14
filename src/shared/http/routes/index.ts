import { customersRouter } from '@modules/customers/routes/customers.routes';
import { productsRouter } from '@modules/products/routes/products.routes';
import { sessionsRoutes } from '@modules/users/routes/sessions.routes';
import { usersRoutes } from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/login', sessionsRoutes);
routes.use('/customers', customersRouter);

export default routes;
