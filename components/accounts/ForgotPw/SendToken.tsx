import SubmitBtn from "@/components/shared/btn/AccBtn";
import { maskUserName, recoverPwService } from "helpers/client/recoverPw";
import { GlobalIcons } from "lib/global/icons";
import { recoverPw_En } from "lib/global/languages/english";
import { User } from "lib/global/types";
import { useState } from "react";

interface SendTokenProps {
    setPopupDisplayed: React.Dispatch<React.SetStateAction<any>>;
    setMethodMasked: React.Dispatch<React.SetStateAction<any>>; 
    updatedUser: User;
}

interface MaskedsTypes {
    emailMasked: string | undefined;
    phoneMasked: string | undefined;
}

export default function SendToken ({setPopupDisplayed, updatedUser, setMethodMasked}: SendTokenProps) {
    const { how_to_get_code_text, via_email_text, via_phone_text, continue_text } = recoverPw_En;
    const { phoneNumber, email, userName } = updatedUser;

    const { emailMasked, phoneMasked }: MaskedsTypes | undefined = (() => {
        if (phoneNumber || email) return maskUserName(phoneNumber, email);
        else return {emailMasked: undefined, phoneMasked: undefined};
    })();

    const { CircleCheckIcon, CircleIcon } = GlobalIcons;

    const [ method, setMethod ] = useState<string>();
    const [ error, setError ] = useState();

    const handleChoseEmail = () => {
        setMethod(() => email);
        setMethodMasked(() => emailMasked);
    }

    const handleChosePhone = () => {
        setMethod(() => phoneNumber);
        setMethodMasked(() => phoneMasked);
    }

    const handleSendToken = () => {
        const abortController = new AbortController();
        const user = {
            userName: userName,
            step: "send token",
            method: (method === email) ? "email" : "phone"
        };
        recoverPwService.sendToken(user,abortController.signal)
        .then(res => setPopupDisplayed(() => "enter-code"))
        .catch(setError)
    }

    //styles 
    const methodElementHeight = " h-256px";
    const btn = " bg-none border-outline-none  "
    
    return (
        <>
        <h5> <strong> {how_to_get_code_text}</strong></h5>
        <hr className="mb-0"></hr>
        <div className={methodElementHeight}>
            {
                emailMasked && 
                <div className="d-flex w-100 align-items-center justify-content-between">
                    <button className={btn + " px-0 list-group-item d-flex w-100 align-items-center justify-content-between"}
                    onClick = {handleChoseEmail}
                    >
                        <p className="mb-0 text-start">{via_email_text} {emailMasked}</p>
                        <div className="mx-3">
                        {method === email ? CircleCheckIcon(25,25) : CircleIcon(25,25)}
                        </div>
                    </button>
                </div>
            }
            {
                phoneMasked &&
                <div className="d-flex align-items-center">
                    <button className={btn + " px-0 list-group-item d-flex w-100 align-items-center justify-content-between"}
                    onClick = {handleChosePhone}
                    
                    >
                        <p className=" mb-2 text-start">{via_phone_text} {phoneMasked}</p>
                        <div className="mx-3">
                        {method === phoneNumber ? CircleCheckIcon(25,25) : CircleIcon(25,25)}
                        </div>
                    </button>
                </div>
            }
        </div>
        <div className="my-4">
            <SubmitBtn handleClick={handleSendToken} type = "button" title = {continue_text} />
        </div>
        </>)
}

