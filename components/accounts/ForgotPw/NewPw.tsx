import SubmitBtn from "@/components/shared/btn/AccBtn";
import { remove } from "helpers/client/popups/popup.slice";
import { recoverPwService } from "helpers/client/recoverPw";
import { GlobalIcons } from "lib/global/icons";
import { recoverPw_En } from "lib/global/languages/english";
import { elementFocused } from "lib/global/styles";
import { User } from "lib/global/types";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "redux/hooks";

interface NewPwProps {
    updatedUser: User;
    setUpdatedUser: React.Dispatch<React.SetStateAction<any>>;
    ids: string[];
    clickedId: string | undefined;
}

export default function NewPw ({updatedUser, setUpdatedUser, ids, clickedId}: NewPwProps) {

    const dispatch = useAppDispatch();
    
    const { create_newPw_text, please_chosePw_text, guest_mode_text, log_in_text } = recoverPw_En;
    const { SquareIcon, SquareCheckedIcon } = GlobalIcons;

    useEffect(() => {
        ids.forEach(id => (id !== clickedId) && elementFocused.unFocus(id));
    }, [clickedId])

    const { userName } = updatedUser;
    const [ newPw, setNewPw ] = useState<string>("");
    const [ guestMode, setGuestMode ] = useState(true);
    const [ error, setError ] = useState();

    const handleGuestMode = () => setGuestMode(() => !guestMode);
    const handleChangePw = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setNewPw(() => value);
    const handleUpdatePw = () => {
        const abortcontroller = new AbortController();
        const userUpdating = {
            userName: userName,
            password: newPw
        };
        recoverPwService.updatePw(userUpdating, abortcontroller.signal)
        .then(res => {
            dispatch(remove(false));
            setUpdatedUser(() => res);
        })
        .catch(setError)    
    }

    //Styles 
    const elementHeight = " h-240px ";
    const inputStyle = " border-outline-none h-54px border-radius-6px px-2 ";

    return (
    <>
        <h5> <strong> {create_newPw_text} </strong></h5>
        <hr></hr>
        <form onSubmit={handleUpdatePw}>
            <div className={elementHeight}>
                <p className="mb-2">{please_chosePw_text}</p>
                <input
                        className = {inputStyle + "w-100"}
                        id = "password_recover"
                        placeholder = "New password"
                        type = "password"
                        value = {newPw}
                        onChange = {handleChangePw}
                        >
                </input>
                <div className="d-flex align-items-center ">
                    <button className="border-outline-none d-flex ps-0 align-items-center list-group-item"
                    onClick = {handleGuestMode}
                    >
                        <div className="d-flex me-2">
                        {guestMode ? SquareCheckedIcon() : SquareIcon()}
                        </div>
                        <p className="my-2 text-start">{guest_mode_text}</p>
                    </button>
                </div>
            </div>
        
            <div className= "my-4">
                <SubmitBtn type = "submit" title = {log_in_text} />
            </div>
        </form>
    </>)
}
