import SubmitBtn from "@/components/shared/btn/AccBtn";
import { remove } from "helpers/client/popups/popup.slice";
import { signupService } from "helpers/client/signup";
import { GlobalIcons } from "lib/global/icons";
import { signupErrors_En, signupNLogin_En } from "lib/global/languages/english";
import { elementFocused } from "lib/global/styles";
import { User } from "lib/global/types";
import { FormEvent, useEffect } from "react";
import  useState  from 'react-usestateref';
import { useAppDispatch} from "redux/hooks";
import Birthday from "./Birthday";
import Error from "./Error";
import 'react-intl-tel-input/dist/main.css';
import { TxtBtn } from "@/components/shared/btn";
import EmailUserInput from "./EmailUserInput";
import PhoneUserInput from "./PhoneUserInput";
const validator = require("validator");
import { isPossiblePhoneNumber } from 'libphonenumber-js';

interface ErrorType {
    message: string | undefined;
}

export default function Form(){

    //icons
    const { EscapeIcon } = GlobalIcons;

    const {
        signup_title_text, first_name_text, last_name_text, user_name_email_text, user_name_phone_text,
        password_text,signup_text, use_DOB_text, use_age_text, birthday_Age_text, birthday_DOB_text, 
    } = signupNLogin_En;
    
    const { birthday_err_text, password_err_text, invalid_username_err_text, first_last_name_err_text, 
        email_taken_text, phone_taken_text
    } = signupErrors_En;
    
    const initialUser = {
        firstName: "",
        lastName: "",
        userName : "",
        password : "",
        ageDay: undefined,
        ageMonth: undefined,
        ageYear: undefined, 
        age: undefined,
        birthday: null,
        dialCode: '',
        phoneNumber: "",
        email: "",
    };

    const dispatch = useAppDispatch();
    
    const ids = ['first_name', 'last_name', 'user_name_popup', 'password_popup', 'age_popup', 'month' ,'day', 'year', 'phone-input' ];
    const [ clickedId, setClickedId, clickedIdRef] = useState<string | null>();
    const [ month, setMonth, monthRef] = useState<string>();
    const [ day, setDay, dayRef] = useState<string>();
    const [ year, setYear, yearRef] = useState<string>();
    const [ birthday, setBirthday, birthdayRef ] = useState<string | null>();
    const [ user, setUser, userRef ] = useState<User>(initialUser);
    const [ error, setError] = useState<ErrorType | undefined>(undefined);
    const [ ageBirthday, setAgeBirthday ] = useState(false);
    const [ emailUser, setEmailUser ] = useState(true);
    const [ disableSubmit, setDisableSubmit ] = useState(true);

    const setIdFocus = (e : KeyboardEvent | MouseEvent) => {
        const abortcontroller = new AbortController();

        const target = e.target as HTMLInputElement;
        setClickedId(() => target.id);

        const phoneField = document.querySelector("#phone");
        const input = phoneField?.querySelector("input");
        const flagSelect = phoneField?.querySelector(".selected-flag");
        if (input) {
            input.style.border = (target.type !== "tel") ? "1px solid #adb5bd" : "2px solid #1877f2"
        };

        if (flagSelect) {
            flagSelect.removeAttribute("tabIndex");
        };

        setError(() => undefined);

        if (clickedIdRef.current) {
            if (ids.includes(clickedIdRef.current)) elementFocused.focus(target.id);
        };

        return () => abortcontroller.abort();
    }

    window.addEventListener("click", setIdFocus);
    window.addEventListener("keyup", setIdFocus);
    
    //Validation for all fields b/f letting the user to submit the form
    useEffect(() => {
        const { firstName, lastName, age, birthday, phoneNumber, email, password, dialCode } = user;
        if ((firstName === "") || (lastName === "")) {
           setDisableSubmit(() => true);
           return ;
        };
        
        const validUserName = email !== "" ? email : phoneNumber;
        if (validUserName === "") {
            setDisableSubmit(() => true);
            return;
        };

        if (email !== "" && !validator.isEmail(email)) {
            setDisableSubmit(() => true);
            return;
        };

        if (phoneNumber && phoneNumber !== "") {
            const numberE64 = `+` + dialCode + phoneNumber;
            const found = isPossiblePhoneNumber(numberE64);
            if (!found) {
                setDisableSubmit(() => true);
                return;
            };
        };

        if ((password === "")){
            setDisableSubmit(() => true);
            return;
        };
         
        if (password && password.length < 8) {
            setDisableSubmit(() => true);
            return;
        };

        const validAge = birthday ? birthday : age;
        if (!validAge) {
            setDisableSubmit(() => true);
            return;
        };
        setDisableSubmit(() => false);

    },[user]);
   
    useEffect(() => {
        const abortcontroller = new AbortController();

        ids.forEach((id, idx) => (id !== clickedId) && elementFocused.unFocus(id));
        return () => abortcontroller.abort();

    }, [clickedId]);
    
    const handleBirthday = () => {
        if (ageBirthday)  setClickedId(() => "month");
        else setClickedId(() => "age_popup");
        setAgeBirthday(() => !ageBirthday);
        setError(() => undefined);
    };
    
    const handleUserName = () => {
        setEmailUser(() => !emailUser);
        setClickedId(() => null);
        setUser((prevUser: User) => ({
            ...prevUser,
            dialCode: "",
            phoneNumber: "",
            email: "",
        }));
    }
    const handleChange = ({target: { name, value }} : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (name === "ageMonth") setMonth(() => value);
        if (name === "ageDay") setDay(() => value);
        if (name === "ageYear") setYear(() => value);
        const date = new Date(`${monthRef.current}/${dayRef.current}/${yearRef.current}`);
        if (Object.prototype.toString.call(date) === "[object Date]"){
            if (isNaN(date.getTime())) {
                setBirthday(() => null);          
            } else {
                setBirthday(() => date.toLocaleDateString());              
            }
        } else {
            setBirthday(() => null);          
        }
        setUser((prevUser: User) => ({
            ...prevUser,
            [name]: value,
            birthday: birthdayRef.current, 
        }));
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const abortcontroller = new AbortController();
        const { firstName, lastName, userName, ageDay, ageMonth, ageYear, ...otherParams} = user;
        const { email, dialCode, phoneNumber } = otherParams
        const newUserName = emailUser ? email?.trim() : `+` + dialCode + phoneNumber;
        if (newUserName) {
            const newUser = {
                userName: newUserName,
                firstName: firstName && firstName.trim(),
                lastName: lastName && lastName.trim(),
                ...otherParams
            };
            signupService.signupFn(newUser,abortcontroller.signal)
            .then((result) => {
                dispatch(remove(false))
            })
            .catch(setError); 
            return () => abortcontroller.abort();
        }
        
    }  
    const handleEscape = () => dispatch(remove(false));
    const errorMessage = error && error.message;
    const userNameErr = () => {
        switch(errorMessage) {
            case "email taken" : return email_taken_text;
            case "phone taken" : return phone_taken_text;
            case "invalid username err": return invalid_username_err_text;
            default: return null;
        }
    }

    // Input Styles
    const filedStyle = "position-relative d-flex px-4 py-2 d-flex flex-column ";
    const labelStyle = "txt-sm fw-7";
    const inputStyle = "bg-gray-200 border-outline-none h-40px border-radius-6px px-2";
    const name_element = "d-flex pb-2 justify-content-between w-100";
    const first_last_name = "w-221d5px";
    const end_tabkeyStyle = " w-0 h-6px color-white border-outline-none bg-none m-0 p-0";

    return (
        <>
        <div className ="">
            <div className ="row mt-3 mx-0 d-flex align-items-center justify-content-between">
                <div className = "col-2"></div>
                <h4  className ="col text-center"> {signup_title_text} </h4>
                <div  className = "col-2 d-flex justify-content-end">
                    <div className ="btn-app">
                        <button className ="btn-app" onClick = {handleEscape}> {EscapeIcon()} </button>
                    </div>
                </div>
            </div>
            <form onSubmit = {handleSubmit}> 
                <div className = {filedStyle}>
                    <div className = {name_element}>
                        <div className = "pe-1 position-relative">
                            <label className={labelStyle} htmlFor="first_name">{first_name_text} </label>
                            <input
                                className = {inputStyle + " " + first_last_name}
                                id = "first_name"
                                name = "firstName"
                                type = "text"
                                value = {user.firstName}
                                onChange = {handleChange}
                                >
                            </input>
                             {(errorMessage === "empty first name") && <Error type = {errorMessage} error = {first_last_name_err_text}/>}
                        </div>
                        <div className = "ps-1 position-relative ">
                            <label className={labelStyle} htmlFor="last_name">{last_name_text} </label>
                            <input
                                className = {inputStyle + " " + first_last_name} 
                                id = "last_name"
                                name = "lastName"
                                type = "text"
                                value = {user.lastName}
                                onChange = {handleChange}
                                >
                            </input>
                            {(errorMessage === "empty last name") && <Error type = {errorMessage} error = {first_last_name_err_text}/>}
                        </div>
                    </div>
                </div>
                
                <div className = {filedStyle}>
                    <label className={labelStyle}>{emailUser ? user_name_email_text : user_name_phone_text}
                     </label>
                    {
                        emailUser 
                        ? <EmailUserInput user = { user } handleChange={handleChange} handleUserName={handleUserName} />
                        : <PhoneUserInput setUser = {setUser} handleUserName={handleUserName} />
                    }
                    {(userNameErr()) && <Error error = {userNameErr()}/> }
                </div>
                <div className = {filedStyle + " mb-2"}>
                    <label className={labelStyle} htmlFor="password_popup">{password_text}</label>
                    <input
                        className = {inputStyle + " w-100"} 
                        id = "password_popup"
                        name = "password"
                        type = "password"
                        value = {user.password}
                        onChange = {handleChange}
                    >
                    </input>
                    {(errorMessage === "invalid password") && <Error error = {password_err_text}/>}
                </div>
                <div className={filedStyle}>
                    <div className={labelStyle}>{ageBirthday ? birthday_Age_text : birthday_DOB_text}</div>
                    {!ageBirthday
                    ? <Birthday user = {user} handleChange = {handleChange}/>
                    : <div className = "">
                            <input
                                className = {inputStyle + " w-100 "}
                                id = "age_popup"
                                name = "age"
                                type = "age"
                                value = {user.age}
                                onChange = {handleChange}
                            >
                            </input>        
                        </div>
                    }
                    {!ageBirthday
                    ? <TxtBtn title = {use_DOB_text} handleClick={handleBirthday}/>
                    : <TxtBtn title = {use_age_text} handleClick={handleBirthday}/>
                    }
                    {(errorMessage === "empty age or birthday") &&
                       <Error error = {birthday_err_text}/>
                    }
                </div>
                <div className={end_tabkeyStyle} >
                    <input className={end_tabkeyStyle}
                        id = "none"
                    ></input>
                </div>
                <div className = "position-relative m-4">
                    <SubmitBtn type = "submit" title = {signup_text} disabled = {disableSubmit}/>
                </div>
            </form>
        </div>
        </>
    )
}