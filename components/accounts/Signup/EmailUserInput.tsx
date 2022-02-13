import { TxtBtn } from "@/components/shared/btn";
import { signupNLogin_En } from "lib/global/languages/english";
import { User } from "lib/global/types";
import { MouseEventHandler } from "react";

interface EmailUserInputProps {
    user: User; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement> ) => void;
    handleUserName: MouseEventHandler<HTMLButtonElement>;
}

export default function EmailUserInput ({user, handleChange, handleUserName}: EmailUserInputProps) {
    const inputStyle = "bg-gray-200 border-outline-none h-40px border-radius-6px px-2";
    const { use_phone_text } = signupNLogin_En;
    return <>
    <div>
        <input
            className = {inputStyle + " w-100"} 
            id = "user_name_popup"
            name = "email"
            type = "text"
            value = {user.email}
            onChange = {handleChange}
        >
        </input>
        <TxtBtn title = {use_phone_text} handleClick={handleUserName}/>
    </div>
    </>
}