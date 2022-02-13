import { MouseEventHandler } from "react";

interface TxtBtnProp {
    title: string;
    handleClick?: MouseEventHandler<HTMLButtonElement> 
}
export default function TxtBtn({title, handleClick}: TxtBtnProp) {

    const txt_btnStyle = "w-fit-content txt-start p-0 m-0 border-outline-none bg-none color-blue ";
    const ignoreTab = -1;
    
    return <button className = {txt_btnStyle} type = "button" 
        tabIndex= {ignoreTab}
        onClick = {handleClick}> 
        <span className="txt-md fw-5 p-0 m-0"> {title}</span>
    </button>
}


