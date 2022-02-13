import { Request, Response, NextFunction } from 'express';
import methodNotAllowed from './errors/methodNotAllowed';

export const GET =  (req: Request, res: Response, next: NextFunction) => {
    const { method } = req;
    if (method !== "GET") {
      methodNotAllowed(req, res, next);
    } else next();
};

export const POST =  (req: Request, res: Response, next: NextFunction) => {
    const { method } = req;
    if (method !== "POST") {
      methodNotAllowed(req, res, next);
    } else next();
}

export const PUT =  (req: Request, res: Response, next: NextFunction) => {
    const { method } = req;
    if (method !== "PUT") {
      methodNotAllowed(req, res, next);
    } else next();
};

export const _DELETE =  (req: Request, res: Response, next: NextFunction) => {
    const { method } = req;
    if (method !== "DELETE") {
      methodNotAllowed(req, res, next);
    } else next();
};
