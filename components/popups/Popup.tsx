import { useAppSelector } from "redux/hooks";
import { Centralize } from "./Centralize";
import Linen from "./Linen";
import { Signup } from "../accounts/Signup";
import RecoverPwPopup from "../accounts/ForgotPw";

interface PopupProp {
    popup: string;
};
export default function Popups({popup}: PopupProp) {
    // get the popupSelected state from Redux store
    const { selected } = useAppSelector(state => state.popup);
    const position = (() => {
        switch(selected) {
            case "signup": return { height: 525, top: 50, width:500, left: 50 };
            case "timer": return { height: 420, top: 50, width:500, left: 50 };
            case "login": return { height: 430, top: 50, width:380, left: 50 };
            case "forgotPw":  return { height: 440, top: 50, width:570, left: 50 };
            default: return { height: 400, top: 50, width:500, left: 50 };
        }
    })()
    const { height, top, width, left } = position;
    // Call the Centralize component in the utils/style and pass in appropriate arguments to get background and element set up for the popup 
    const { bgStyle, elementPosition, offsetElementPosition } = Centralize(height, top, width, left);
    // Style the popup form 
    const elementStyle = { 
        ...elementPosition,
        width: `${position.width}px`,
        height: `${position.height}px`,
        background: "white",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 2px" 
    };

    const popupRendered = (() => {
        if(selected) {
            switch (selected) {
                case "signup": return <Signup />;
                case "forgotPw": return <RecoverPwPopup />;
            }
        };
        return null;
    })()
    return ( popup 
    ?   <>
            <Linen />
            <div style = {bgStyle} >
                <div style = {elementStyle}>
                    {popupRendered}
                </div>
                <div style ={offsetElementPosition}></div>
            </div>
        </>
    : <></>
    )
}