import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

class SessionsController {
  public async createToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionsService();
    const token = await createSessionService.execute({ email, password });
    return response.json(token);
  }
}

export { SessionsController };
