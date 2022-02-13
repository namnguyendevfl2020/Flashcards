import { AccountIcons } from "lib/global/icons";
import { ErrorType } from "lib/global/types";

interface ErrorProps {
    error: ErrorType | null;
    message:string | null
}

export default function Error ({error, message}: ErrorProps) {

    const { ErrorIcon } = AccountIcons;

    //styles
    const elementStyle = " bg-red-orange color-red border-red p-2 d-flex align-items-center";
    const errorIconStyle = "bg-orange mx-2 d-flex align-items-center justify-content-center";
    
    return (error &&
        <div className = {elementStyle} > 
            <div className = {errorIconStyle}> 
            {ErrorIcon()} 
            </div>
            <div className = "ms-2">{message}</div>
        </div>  
    )
}