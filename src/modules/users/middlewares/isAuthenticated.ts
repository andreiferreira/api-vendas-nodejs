import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autHeader = request.headers.authorization;
  if (!autHeader) {
    throw new AppError('JWT Token is missing!', 401);
  }

  const [, token] = autHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    if (decodeToken) return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { isAuthenticated };
