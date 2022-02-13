import { MouseEventHandler } from "react";

interface SubmitBtnProp {
    disabled?: boolean;
    type: "button" | "submit" | "reset" | undefined;
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement> 
};

export default function SubmitBtn({disabled, type, title, handleClick}: SubmitBtnProp) {
    
    const ignoreTab = -1;
    
    return <button 
        tabIndex = {ignoreTab} 
        type = {type}
        className = "bg-blue h-42px list-group-item color-white border-radius-8px w-100 p-2"
        onClick = {handleClick}
        disabled = {disabled}
        >
            <span className = "fw-7"> {title}</span>
        </button>
}