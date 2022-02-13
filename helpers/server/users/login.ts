import { Request, Response, NextFunction } from 'express';
import { dbToFrontConverter } from '../utils';
const argon2 = require("argon2");
import { service } from "./users.service";
import getConfig from 'next/config';

const saveLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.userLogin = req.body.data;
    next();
} 

const match_userName = async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = res.req.body.data;
    const findUserName = await service.readUserName(userName);
    const findPhoneNumbers = await service.readPhoneNumber(userName);
    if ( findUserName.length === 1 || findPhoneNumbers.length === 1 ) {
        res.locals.foundUserName = findUserName.length === 1 ? findUserName[0] : findPhoneNumbers[0];
        next();
    } else {
        next({
            status: 400,
            message: "notfound username"
        });
    };
}

const match_pw = async (req: Request, res: Response, next: NextFunction) => {
    const { foundUserName, userLogin } = res.locals;
    const { password, secret_key , ...returnedUserDb } = foundUserName;
    const returnedUser = dbToFrontConverter(returnedUserDb)
    const { firstName, lastName } = returnedUser;
    const matchedPw = await argon2.verify(password, userLogin.password);
    if (matchedPw) {
        return res.status(201).json({data: returnedUser});
    } else {
        return next({
        status: 400,
        message: `invalid password`,
        firstName: firstName,
        lastName: lastName, 
    })};
}

export { 
    saveLogin,
    match_userName,
    match_pw
};