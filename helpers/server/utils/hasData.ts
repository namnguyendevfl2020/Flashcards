import { Request, Response, NextFunction } from 'express';

export function hasData(req: Request, res: Response , next: NextFunction) {
    if (req.body.data) {
        res.locals.data = req.body.data;
        return next();
    };
    next ({
        status: 400,
        message: "body must have data property"
    });
}