
import React, { FormEvent, useEffect } from "react";
import  useState  from 'react-usestateref';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import login from "./login.module.css";
import { useRouter } from "next/router";
import { loggedInService } from "helpers/client/logins";
import { Popup } from "@/components/popups";
import { savePopup } from "helpers/client/popups/popup.slice";
import { elementFocused } from "lib/global/styles";
import { ErrorType, User } from "lib/global/types";
import { loginErrs_En, signupErrors_En, signupNLogin_En } from "lib/global/languages/english"
const validator = require("validator");
import Error from "./Error";
import LoginPassword from "./LoginPw";
import { saveLoggedIn } from "helpers/client/logins/loggedIns.Slice";

export default function LoginForm(){

    const router = useRouter();
    const popupSelected = useAppSelector(state => state.popup.selected);
    const dispatch = useAppDispatch();

    const { login_title_text, user_name_text } = signupNLogin_En;
    const { invalid_username_err_text } = signupErrors_En;

    const { notFound_username_err_text, invalid_pw_text } = loginErrs_En;
    const [ popup, setPopup ] = useState<string | null>(null);

    //create an ids array and clickedId variable using useStateRef to set window.focus() on a clicked element and window.unfocus() on other elements
    const ids = ['user_name_login', 'password_login'];
    const [ clickedId, setClickedId, clickedIdRef] = useState<string | undefined>();
    const setIdFocus = (e : KeyboardEvent | MouseEvent) => {
        setError(() => null);
        const target = e.target as Element;
        setClickedId(() => target.id);
        if (clickedIdRef.current) {
            if (ids.includes(clickedIdRef.current)) elementFocused.focus(target.id);
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (typeof window !== undefined) {
                window.addEventListener("click", setIdFocus);
                window.addEventListener("keyup", setIdFocus);
            }
            ids.forEach((id, idx) => (id !== clickedId) && elementFocused.unFocus(id));
            setPopup(() => popupSelected);
        }
        return () => { isMounted = false };
    }, [clickedId, popupSelected]);

    const initialLogin = {
        phoneNumber: undefined,
        userName: "",
        password:"",
        guestMode: true
    };

    const [ user, setUser, userRef ] = useState<User>(initialLogin);
    const [ error, setError ] = useState<ErrorType | null>(null);

    useEffect(() => {
        if (popup) {
            if (typeof window !== "undefined") {
                const body = window.document.querySelector<HTMLElement>("body");
                  if (body) body.style.overflow = "hidden";
              }
        }
      },[popup])


    const handleChange = ({target: {name, value }}: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }
    
    const errorMessage = error && error.message;
    const userNameErr = (() => {
        switch(errorMessage) {
            case "notfound username" : return { message: notFound_username_err_text };
            case "invalid username err": return { message: invalid_username_err_text }; 
            default: return null
        }
    })()
    
    const pwErr = (() => {
        if (errorMessage === "invalid password") {
            return { message: invalid_pw_text};
        } else return null
    })()
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const abortcontroller = new AbortController();
        if (!validator.isEmail(user.userName)) user.phoneNumber = user.userName;
        loggedInService.signin(user, abortcontroller.signal)
        .then(res => {
            if (user.guestMode === false) {
                localStorage.setItem('loggedIn', JSON.stringify(res))
                // localStorage.setItem('id', JSON.stringify(res))
            }
            dispatch(saveLoggedIn(res))
            const returnUrl = loggedInService.returnUrl();
            router.push(`${returnUrl}`);
        })
        .catch(setError);
    }

    const handleSignup = () => {
        dispatch(savePopup("signup"));
    }

    //styles
    const inputStyles = ' h-40px border-radius-6px border-outline-none px-2 w-100';
    const labelStyle = "txt-sm fw-7";

    return (
    <>
        {popup && <Popup popup = {popup}/>}    
        <div className="d-flex justify-content-center mt-4">
        <div className = {login["login-container"] + ""}>
            <div className ="row mx-0 d-flex align-items-center justify-content-between">
                <h5 className ="col text-center"> <strong>{login_title_text}</strong></h5>
            </div>
            <div className = "">
            <form onSubmit = {e => handleSubmit(e)}> 
                <div className = "d-flex px-3 pt-3 flex-column">
                    <label className={labelStyle} htmlFor="user_name_login">{user_name_text}
                    </label>
                    <input
                        className = {inputStyles}
                        id = "user_name_login"
                        name = "userName"
                        type = "text"
                        value = {user.userName}
                        onChange = {handleChange}
                    >
                    </input>
                </div>
                {errorMessage === "notfound username" || errorMessage === "invalid username err"
                ? <Error error = {userNameErr}/>
                : <div className = "mb-3"> </div>
                }
                <div className = "mb-3"> </div>
                <LoginPassword 
                    user = {user} setUser = {setUser} 
                    handleChange = {handleChange} 
                    password_id = {"password_login"}
                    error = {pwErr}
                />
            </form>
            </div>
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <p className="m-0">Not registered?</p>
                    <button className="border-outline-none bg-none color-blue" onClick = {handleSignup}>Create Account</button>
                </div>
            </div>
        </div>
    </div>
    </>  
    )
}