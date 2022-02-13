import { Request, Response, NextFunction } from 'express';
import { DbUser } from 'lib/global/types';
import { service } from './users.service';
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export {
    generateKey,
    findUser,
    generateToken,
    sendTokenViaEmail,
    sendTokenViaPhone,
    verifyToken,
    pw_isValid,
    updatePw
}

//create a secret key and save it to the db when a user signs up
const generateKey = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.key = speakeasy.generateSecret({length:30});
    next();
};

const findUser = async (req: Request, res: Response , next: NextFunction) => {
    const reqUser = req.body.data;
    const findUserName = await service.readUserName(reqUser.userName);
    const findPhoneNumbers = await service.readPhoneNumber(reqUser.userName);
    res.locals.step = reqUser.step;
    const { step } = res.locals;
    if ( findUserName.length === 1 || findPhoneNumbers.length === 1 ) {
        const { password, secret_key , email, phone_number, user_name, dial_code, ...returnedUserDb } = findUserName.length ? findUserName[0] : findPhoneNumbers[0];
        // const returnedUser = dbToFrontConverter(returnedUserDb)
        const returnedUser = {
            userName: user_name,
            email: email,
            phoneNumber: phone_number,
            dialCode: dial_code,
        }
        res.locals.userForgotPw = findUserName[0];
        if (step === "find user") {
            res.locals.steps = {
                findUser: "done"
            };
            res.status(201).json({data: returnedUser});
        }
        else {
            return next();
        };
    } 
    else if (findPhoneNumbers.length > 1) {
        const duplicates = findPhoneNumbers.map((user: DbUser) => {
            const { user_id, user_name, first_name, last_name, phone_number, email, dial_code, country } = user;
            const returnedUser = {
                id: user_id,
                userName: user_name,
                firstName: first_name,
                lastName: last_name,
                phoneNumber: phone_number,
                email: email,
                dialCode: dial_code,
                country: country
            };
            return returnedUser;
        })
        res.status(201).json({data: duplicates});
    }
    else next({
        status: 400,
        message: "user not found"
    });
}

const generateToken = (req: Request, res: Response , next: NextFunction) => {
    const { userForgotPw: { secret_key }, step } = res.locals;
    const key = JSON.parse(secret_key);
    res.locals.key = key;
    // res.json({data: req.body.data})
    if (step === "send token") {
        const token = speakeasy.totp({
            secret: key.hex,
            encoding: "hex"
        });
        const remaining = (15*60 - Math.floor((new Date().getTime()/1000.0 % 30)));
        res.locals.token = token;
        res.locals.remaining = remaining;
        next();
    } else next();
};

const sendTokenViaEmail = (req: Request, res: Response , next: NextFunction) => {
    const reqUser = req.body.data;
    res.locals.method = reqUser.method;
    const { token, remaining, method, step, userForgotPw } = res.locals;
    const { APP_EMAIL_USERNAME, APP_EMAIL_PW } = serverRuntimeConfig.env
    const userEmail = userForgotPw.email;
    if (step === "send token") {
        if (method === "email") {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: APP_EMAIL_USERNAME,
                    pass: APP_EMAIL_PW
                }
            });
         
            const options = {
                from: APP_EMAIL_USERNAME,
                to: userEmail,
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>Your verification code is ${token}</b>`,
                amp: `<!doctype html>
                <html ⚡4email>
                  <head> 
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p>Your verification code is ${token}</p>
                    
                  </body>
                </html>`
            };
            type info = {
                message: string;
            };
            return transporter.sendMail(options, (err: string , info: info ) => {
                if (err) {
                    return next({
                        status: 400,
                        message: err
                    });
                }
                res.locals.steps = {
                    ...res.locals.steps,
                    sendTokenViaEmail: "done",
                };
                res.status(201).json({data: "token sent"});
            });
        } else return next();
    } else return next();
}

const sendTokenViaPhone = (req: Request, res: Response , next: NextFunction) => {
    const { token, remaining, method, step, userForgotPw : { dial_code, phone_number } } = res.locals;
    const userNumber = "+" + dial_code + phone_number;
    if (step === "send token") {
        if (method === "phone") {
            const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, APP_NUMBER } = serverRuntimeConfig.env
            const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

            client.messages
            .create({
                body: `Your verification code is ${token}`,
                from: APP_NUMBER,
                to: userNumber
            })
            .then((message: string) => {
                res.status(201).json({data: message});
            })
            //@ts-ignore
            .catch((err) => {
                next({
                    status: err.status,
                    message: err.message
                });
            });
        };
    } else next();
};

const verifyToken = (req: Request, res: Response , next: NextFunction) => {
    if (res.locals.step === "verify token") {
        const reqUser = req.body.data;
        const {  key } = res.locals;
    
        const result = speakeasy.totp.verify({
            secret: key.hex,
            encoding: "hex",
            token: reqUser.token,
            window: 20,
        }) ;
        if (result) {
            res.locals.steps = {
                ...res.locals.steps,
                verifyToken: "done",
            };
            res.status(202).json({data: result});
        } else next({
            status: 400,
            message: `wrong code`
        });
    } else next();
};


const pw_isValid = (req: Request, res: Response , next: NextFunction) => {
    const { password } = req.body.data;
    if ( password.length >=8 ) return next();
    return next({
        status: 400,
        message: "invalid password"
    });
};

const updatePw = (req: Request, res: Response , next: NextFunction) => {
    const { userForgotPw, pwHashed } = res.locals;
    userForgotPw.password = pwHashed;
    res.locals.UserUpdating = userForgotPw;
    next();
};


