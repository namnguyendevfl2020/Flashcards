import { Request, Response, NextFunction } from 'express';
import { service } from "./users.service";

const match_email = async (req: Request, res: Response, next: NextFunction) => {
    const { foundUserName } = res.locals;
    const { userName } = req.body.data;
    res.json({data: req.body.data})
    if (foundUserName) {
        if (userName === foundUserName.email) {
            res.locals.foundUserNameEmail = foundUserName;
        } else res.locals.foundUserNameNumber = foundUserName;
    };
    next();
};

const match_number = async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = res.req.body.data;
    if (res.locals.foundUserName) {
        next();
    }
    else {
        const findPhoneNumber = await service.readPhoneNumber(userName);
        if (findPhoneNumber.length) {
            if (findPhoneNumber.length === 1) {
                res.locals.foundUniqueNumber = findPhoneNumber[0];
                next();
            }
            else {
                res.locals.foundDuplicateNumbers = findPhoneNumber;
                next();
            }
        } else {
            next({
                status: 400,
                message: "notfound username"
            });
        };
    };
};


interface DupUser {
    user_id: number;
    country: string;
    dial_code: string;
}

const handleDuplicate = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.foundDuplicateNumbers){
        const { foundDuplicateNumbers } = res.locals;
        const dupNumbers = foundDuplicateNumbers.map((user: DupUser) => {
            const { user_id, dial_code, country } = user;
            return {id: user_id, country: country, dialCode: dial_code};
        })
        res.json({data: dupNumbers});
    } else {
        next();
    };
};


export { 
    match_email,
    match_number,
    handleDuplicate,
};