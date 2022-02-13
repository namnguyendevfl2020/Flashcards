import { savePopup } from "helpers/client/popups/popup.slice";
import { GlobalIcons } from "lib/global/icons";
import { signupNLogin_En } from "lib/global/languages/english";
import { User } from "lib/global/types";
import React, { FormEvent } from "react";
import { useAppDispatch } from "redux/hooks";
import Error from "./Error"

interface LoginPwProps {
    user: User;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> ) => void;
    password_id: string;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    error: LoginErrors | null;
}

interface LoginErrors {
    message: string;
}

export default function LoginPw ({user, handleChange, password_id, error, setUser}: LoginPwProps) {
    
    const { login_title_text, password_text, guest_mode_text, forgot_pass_text } = signupNLogin_En;
    const {  SquareIcon, SquareCheckedIcon } = GlobalIcons;

    const { password } = user;

    const handleGuestMode = () => {
        setUser((prevUser: User) => ({
            ...prevUser,
            guestMode: !prevUser.guestMode
        }))
    }

    const dispatch = useAppDispatch()
    const handleForgotPw = (e: FormEvent) => {
        e.preventDefault();
        dispatch(savePopup("forgotPw"))
    }
    
    //styles
    const inputStyles = ' border-outline-none h-40px border-radius-6px px-2 w-100';
    const labelStyle = "txt-sm fw-7";

    //tabindex
    const ignoreTab = -1;
    return (
        <>
            <div className = "d-flex px-3 flex-column">
                <label className={labelStyle} htmlFor = "password"> {password_text}</label>
                <input
                    className = {inputStyles}
                    id = {password_id}
                    name = "password"
                    type = "password"
                    value = {password}
                    onChange = {handleChange}
                >
                </input>
            </div>
            <div className = "pb-1"> 
            </div>
            {error !== null
                ? <Error error = {error}/>
                : <div> </div>
            }
            <div className="d-flex align-items-center px-3">
                <button className="border-outline-none d-flex ps-0 align-items-center list-group-item"
                type = "button"
                onClick = {handleGuestMode}
                >
                    <div className="me-2 d-flex align-items-center ">
                    {user.guestMode ? SquareCheckedIcon() : SquareIcon()}

                    </div>
                    <p className="my-0 text-start">{guest_mode_text}</p>
                </button>
            </div>
            
            { error === null && <div style = {{height:"31px"}}> </div>}
            <div className ="d-flex justify-content-center my-2"  > 
                <button className="border-outline-none bg-none" tabIndex = {ignoreTab} 
                type = "reset" onClick = {handleForgotPw} > 
                    <span className ="text-center color-blue" >{forgot_pass_text}</span>
                </button>
            </div>            
            <div className = "position-relative m-3 mt-1 d-flex justify-content-center">
                <button tabIndex = {ignoreTab}
                className = "bg-blue color-white border-radius-8px list-group-item w-100 p-2"
                type = "submit"
                >
                    <span className = "fw-7">{login_title_text}</span>
                </button>
            </div>
        </>
    )
}
