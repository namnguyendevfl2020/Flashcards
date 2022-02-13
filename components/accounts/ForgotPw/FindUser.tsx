import SubmitBtn from "@/components/shared/btn/AccBtn";
import { recoverPwService } from "helpers/client/recoverPw";
import { recoverPwErrors_En, recoverPw_En, signupNLogin_En } from "lib/global/languages/english";
import { ErrorType } from "lib/global/types";
import React, { useState } from "react";
import Error from "./Error";

interface SearchProps {
    setPopupDisplayed: React.Dispatch<React.SetStateAction<any>>;
    setUpdatedUser: React.Dispatch<React.SetStateAction<any>>;
    setDuplicateUsers: React.Dispatch<React.SetStateAction<any>>;
}

export default function FindUser ({setPopupDisplayed, setUpdatedUser, setDuplicateUsers}: SearchProps) {
    const { find_your_account_text, search_instruction_text, search_text } = recoverPw_En;
    const { notFound_username_err_text, empty_userName_err } = recoverPwErrors_En();
    const { user_name_text } = signupNLogin_En;

    const [ userName, setUserName ] = useState("");
    const [ error, setError ] = useState<ErrorType | null>(null);

    const handleChange = ({target: { value }}: React.ChangeEvent<HTMLInputElement>) => setUserName(() => value);
    const handleSearch = () => {
        const abortcontroller = new AbortController();
        const userSearched = { userName: userName.trim(), step: "find user"};
        if (userSearched.userName === "") setError(() => ({message: "empty username err"}))
        else {
            recoverPwService.findUser(userSearched, abortcontroller.signal)
            .then(res => {
                if (res.length || Array.isArray(res)) {
                    setDuplicateUsers(() => res);
                    setPopupDisplayed(() => "handle-duplicates");
                } else {
                    setPopupDisplayed(() => "send-token");
                    setUpdatedUser(() => res);
                }
            })
            .catch(setError)
        } 
    }

    const errorMessage = error && error.message;

    const userNameErr = () => {
        switch(errorMessage) {
            case "notfound username": return notFound_username_err_text;
            case "empty username err": return empty_userName_err;
            default: return null;
        }
    };

    //styles
    const inputStyle = " border-outline-none h-54px border-radius-6px px-2 ";
    const errElementHeight = " h-155px my-3 ";

    return (
        <>
            <h5> <strong> {find_your_account_text} </strong></h5>
            <p>{search_instruction_text}</p>
            <div className = "d-flex">
                    <input
                        className = {inputStyle + "w-100"}
                        id = "user_name_recover"
                        name = "user_name"
                        placeholder = {user_name_text}
                        type = "text"
                        value = {userName}
                        onChange = {handleChange}
                    >
                    </input>
            </div>
            <div className={errElementHeight}>
                <Error error = {error} message = {userNameErr()}/>
            </div>
            <div className= "my-4">
                <SubmitBtn type = "button" title = {search_text} handleClick={handleSearch}/>
            </div>
        </>
    )
}
