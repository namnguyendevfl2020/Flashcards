import { Request, Response, NextFunction } from 'express';
const argon2 = require('argon2');

export const hashPw = async (req: Request, res: Response, next: NextFunction) => {
    const pw = req.body.data.password;
    try {
        res.locals.pwHashed = await argon2.hash(pw, {type: argon2.argon2id})
        next();
    } catch(err) {
        return next({
            status: 400,
            message: `hashing failed` 
        });
    };
};

