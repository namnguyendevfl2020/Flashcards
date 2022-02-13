import { AccountIcons } from "lib/global/icons";
import { ErrorType } from "lib/global/types";

interface ErrorProp {
    error: ErrorType | null;
}

export default function Error ({error}: ErrorProp) {

    const { ExclamationCircleIcon } = AccountIcons;

    const errorStyle = " fs-sm color-red me-3 my-1";
    
    return ( error &&
        <div className = "ms-3 d-flex" > 
            <div className = " me-2 my-1"
            > {ExclamationCircleIcon()} </div>
            <span className = {errorStyle}> {error.message} </span>
        </div>  
    )
}