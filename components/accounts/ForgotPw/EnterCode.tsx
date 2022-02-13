import SubmitBtn from "@/components/shared/btn/AccBtn";
import { recoverPwService } from "helpers/client/recoverPw";
import { recoverPwErrors_En, recoverPw_En } from "lib/global/languages/english";
import { elementFocused } from "lib/global/styles";
import { ErrorType, User } from "lib/global/types";
import React, { useEffect, useState } from "react";
import Error from "./Error";

interface EnterCodeProps {
    setPopupDisplayed: React.Dispatch<React.SetStateAction<any>>;
    updatedUser: User;
    methodMasked: string | undefined;
    ids: string[];
    clickedId: string | undefined;
}

export default function EnterCode ({setPopupDisplayed, updatedUser, methodMasked, ids, clickedId }: EnterCodeProps) {

    const [ code, setCode ] = useState<string>("");
    const [ error, setError ] = useState<ErrorType | null>(null);

    const { enter_code_text, code_sent_text, code_expired_text, didt_get_code_text, continue_text } = recoverPw_En;
    const { isNaN_code_err, empty_code_err, code_length_err, wrong_code_err } = recoverPwErrors_En(code.length);
    
    const { userName } = updatedUser;

    const handleEnterCode = ({target: { value}}: React.ChangeEvent<HTMLInputElement>) => setCode(() => value);
    const handleResendCode = () => setPopupDisplayed(() => "send-token");

    useEffect(() => {
        ids.forEach(id => (id !== clickedId) && elementFocused.unFocus(id));
    }, [clickedId]);

    const handleValidate = () => {
        const abortcontroller = new AbortController();
        const user = {
            userName: userName,
            step: "verify token",
            token: code.trim()
        };
        if (code === "") setError(() => ({message: "empty code err"}))
        //@ts-ignore: isNaN doesnt work in TS
        else if (isNaN(code)) setError(() => ({message: "isNaN code err"}))
        else if (code.length !== 6) setError(() => ({message: "code length err"}))
        else {
            recoverPwService.verifyToken(user, abortcontroller.signal)
            .then(res => setPopupDisplayed(() => "create-newPw"))
            .catch(setError);
        }
    }
    
    const errorMessage = error && error.message;

    const passwordErr = () => {
        switch(errorMessage) {
            case "empty code err": return empty_code_err;
            case "isNaN code err": return isNaN_code_err;
            case "code length err": return code_length_err;
            case "wrong code": return wrong_code_err;
            default: return null;
        }
    }

    //styles
    const elementHeight = " h-240px ";
    const inputStyle = " border-outline-none h-54px border-radius-6px px-2 ";
    const txt_btnStyle = "border-outline-none bg-none color-blue";

    return (
        <>
           <h5> <strong>{enter_code_text}</strong></h5>
        <hr></hr>
        <div className={elementHeight}>
        {
            <>
            <p className="m-0">{code_sent_text} {methodMasked} </p>
            <p>{code_expired_text}</p>
            <input
                    className = {inputStyle + "w-100"}
                    id = "enterCode_recover"
                    placeholder = "Enter your code"
                    type = "text"
                    value = {code}
                    onChange = {handleEnterCode}
                    >
            </input>
            <div className="mt-2 d-flex align-items-center">
                <button className={txt_btnStyle} onClick = {handleResendCode}>
                    <p className="text-start">{didt_get_code_text}</p>
                </button>
            </div>
            <Error error = {error} message ={passwordErr()}/>
            </>
        }
        </div>

        <div className= "my-4">
            <SubmitBtn type = "button" handleClick={handleValidate} title = {continue_text} />
        </div>
        </>
    )
}