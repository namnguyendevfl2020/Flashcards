import { Request, Response, NextFunction } from 'express';
import { service } from "./users.service";
const validator = require("validator");
import { isPossiblePhoneNumber } from 'libphonenumber-js';

export {
    saveSignup,
    validateFields,
    signup_isUniquePhone,
}

const saveSignup = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.userSignup = req.body.data;
    next();
};

const validateFields = async (req: Request, res: Response, next: NextFunction) => {
    const { userSignup : { firstName, lastName, userName, age, birthday, password } } = res.locals;
    const findUserName = await service.readUserName(userName);
    
    if ((firstName === "")) {
        return next({message: "empty first name"});
    };

    if ((lastName === "")) {
        return next({
            status: 400,
            message: "empty last name"
        });
    };

    if (!(validator.isEmail(userName)) && (!isPossiblePhoneNumber(userName))) {
        return next({ 
            status: 400,
            message: "invalid username err" });
    }; 
    
    if (findUserName.length) {
        if (validator.isEmail(userName)) {
            return next({
                status: 400,
                message: "email taken"
            });
        } else return next({
            status: 400,
            message: "phone taken"
        });
    };

    if (!password || password === "" || password.length < 8) {
        return next({ 
            status: 400,
            message: "invalid password" 
        }); 
    };

    if ((!age) && (!birthday)) {
        return next({message: "empty age or birthday"});
    };

    next();
} 

const signup_isUniquePhone = async (req: Request, res: Response , next: NextFunction) => {
    const { userSignup } = res.locals;
    if (userSignup.phoneNumber) {
        const findPhoneNumber = await service.readPhoneNumber(userSignup.phoneNumber);
        if (!findPhoneNumber.length) {
            res.json({data: userSignup});
        } else {
            userSignup.unique_number = false;
        };
    }; 
    next();
};

