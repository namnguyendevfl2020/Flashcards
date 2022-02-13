import React, { useEffect } from "react";
import  useState  from 'react-usestateref'
import { useDispatch } from "react-redux";
import SendToken from "./SendToken";
import EnterCode from "./EnterCode";
import NewPw from "./NewPw";
import FindUser from "./FindUser";
import { GlobalIcons } from "lib/global/icons";
import { elementFocused } from "lib/global/styles";
import { remove } from "helpers/client/popups/popup.slice";
import { User } from "lib/global/types";
import Duplicates from "./Duplicates";

export default function RecoverPwPopup() {

    const dispatch = useDispatch();
    const { EscapeIcon, BackIcon } = GlobalIcons;

    const [ clickedId, setClickedId, clickedIdRef ] = useState<string | undefined>();
    const [ popupDisplayed, setPopupDisplayed ] = useState<string>("search");
    const [ duplicateUsers, setDuplicateUsers ] = useState([]);
    const [ updatedUser, setUpdatedUser ] = useState<User | null>(null);
    const [ methodMasked, setMethodMasked ] = useState();

    const handleEscape = () => {
        setUpdatedUser(() => null);
        setDuplicateUsers(() => []);
        dispatch(remove(false));
    }

    const handleBackup = () => {
        setDuplicateUsers(() => []);
        setClickedId(() => "none");
        setUpdatedUser(() => null);
        setPopupDisplayed(() => "search");
    }

    const ids = [ "user_name_recover", "password_recover", "enterCode_recover"];

    const setIdFocus = (e : KeyboardEvent | MouseEvent) => {
        const target = e.target as Element;
        setClickedId(() => target.id);
        if (clickedIdRef.current) {
            if (ids.includes(clickedIdRef.current)) elementFocused.focus(target.id);
        }
    }

    window.addEventListener("click", setIdFocus);
    window.addEventListener("keyup", setIdFocus);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            ids.forEach(id => (id !== clickedId) && elementFocused.unFocus(id));
        }
        return () => { isMounted = false };
    }, [clickedId]);
    
    const popupRendered = (() => {
        if (updatedUser != null) {
            switch (popupDisplayed) {
                case "send-token": return <SendToken setPopupDisplayed = {setPopupDisplayed} updatedUser = {updatedUser} setMethodMasked = {setMethodMasked}/>;
                case "enter-code": return <EnterCode ids = {ids} clickedId = {clickedId} setPopupDisplayed = {setPopupDisplayed} updatedUser={updatedUser} methodMasked = {methodMasked}/>;
                case "create-newPw": return <NewPw ids = {ids} clickedId = {clickedId}  setUpdatedUser = {setUpdatedUser} updatedUser={updatedUser}/>;
            }
        } else if (duplicateUsers.length !== 0) {
            return <Duplicates setUpdatedUser={setUpdatedUser} setPopupDisplayed = {setPopupDisplayed} duplicateUsers={duplicateUsers} setMethodMasked = {setMethodMasked}/>;
        }
        return <FindUser setDuplicateUsers = {setDuplicateUsers} setUpdatedUser={setUpdatedUser} setPopupDisplayed = {setPopupDisplayed} />;
    })()

    
    return (<>
        <div className ="row mx-0 my-2 d-flex align-items-center justify-content-between">
            <div className = "col-2">
                {(popupDisplayed == "send-token" || popupDisplayed == "handle-duplicates") && 
                <div className ="btn-app"> 
                    <button className ="btn-app" onClick = {handleBackup}> {BackIcon()} </button>                   
                </div>
                }
            </div>
            <div  className ="col"> </div>
            <div  className = "col-2 d-flex justify-content-end">
                <div className ="btn-app"> 
                    <button className ="btn-app" onClick = {handleEscape}>
                        {EscapeIcon()}
                    </button>                   
                </div>
            </div>
        </div>
        <div className= "px-3">
            {popupRendered}
        </div>
    </>)
}