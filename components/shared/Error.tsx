import { ErrorType } from "lib/global/types";
import React from "react";

interface ErrorProp {
    error: ErrorType;
};
export default function Error({error}: ErrorProp){
    return (
        error &&
        <div>
            Error: {error.message}
        </div>
        
    )
}