import { Request, Response, NextFunction } from 'express';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: { message: message, status: status }});
}

export { errorHandler };
