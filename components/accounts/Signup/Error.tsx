import styles from "./signup.module.css";

interface ErrorProp {
    error: string | null;
    type?: string;
}

export default function Error ({error, type}: ErrorProp) {
    const position = (()=>{
        if (type === "first name err") return styles["first-name-err"];
        if (type === "last name err") return styles["last-name-err"];
        return styles.error
    })() 

    const style = position + " w-96 name-first-last d-flex align-items-center border-radius-6px";
    
    return (
        <div className = {style} >
            <div className = "d-flex align-items-center"> 
                <div className = "mx-3"> {error} </div>
            </div> 
        </div> 
    )
}