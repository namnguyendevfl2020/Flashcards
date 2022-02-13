import { Request, Response, NextFunction } from 'express';
import { service } from "./users.service";
import { asyncErrorBoundary } from '../errors';
import { dbToFrontConverter, front2DbConverter, hasData, hashPw } from '../utils';
import { findUser, generateKey, generateToken, pw_isValid, sendTokenViaEmail, sendTokenViaPhone, updatePw, verifyToken } from './recoverPw';
import { saveSignup, validateFields } from './signup';
import { handleDuplicate, match_number, } from './findUser';
import { match_pw, saveLogin, match_userName } from './login';

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.users = await service.list();
    next();
}

const post = async (req: Request, res: Response, next: NextFunction) => {
    const { userSignup, pwHashed, key } = res.locals;
    userSignup.password = pwHashed;
    userSignup.secret_key = key;
    const signupDb = front2DbConverter(res.locals.userSignup)
    const responseDb = await service.post(signupDb);
    const { password, secretKey, ...returnedParams} = dbToFrontConverter(responseDb[0])
    return res.status(201).json({data: "signup sucessfully"});
}

const update = async (req: Request, res: Response) => {
    const { UserUpdating } = res.locals;
	const response = await service.update(UserUpdating.user_id, UserUpdating);
	res.status(200).json({ data: "updated"});
}

const _delete = async (req: Request, res: Response) => {
    const { deckId } = req.query;
    await service._delete(Number(deckId));
    res.status(200).json({ data: { status: "deleted" } });

}

export const usersController = {
    login: 
        [asyncErrorBoundary(hasData), 
        asyncErrorBoundary(saveLogin), 
        asyncErrorBoundary(match_userName), asyncErrorBoundary(match_number),
        asyncErrorBoundary(handleDuplicate), asyncErrorBoundary(match_pw)],
    
    signup: 
        [
        asyncErrorBoundary(hasData), asyncErrorBoundary(saveSignup), 
        asyncErrorBoundary(validateFields), 
        asyncErrorBoundary(hashPw), 
        asyncErrorBoundary(generateKey), asyncErrorBoundary(post)],

    recoverPw: 
        [asyncErrorBoundary(hasData), 
        asyncErrorBoundary(findUser),
        asyncErrorBoundary(generateToken), asyncErrorBoundary(sendTokenViaEmail), asyncErrorBoundary(sendTokenViaPhone),
        asyncErrorBoundary(verifyToken),
        asyncErrorBoundary(pw_isValid),
        asyncErrorBoundary(hashPw), asyncErrorBoundary(updatePw), 
        asyncErrorBoundary(update)
    ],
    list: [asyncErrorBoundary(listUsers)],
    update: [asyncErrorBoundary(update)],
    _delete: [asyncErrorBoundary(_delete)],

}



