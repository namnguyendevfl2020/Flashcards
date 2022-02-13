import SubmitBtn from "@/components/shared/btn/AccBtn";
import { GlobalIcons } from "lib/global/icons";
import { User } from "lib/global/types";
import { useState, MouseEvent } from "react";

interface DuplicatesProps {
    setPopupDisplayed: React.Dispatch<React.SetStateAction<any>>;
    setMethodMasked: React.Dispatch<React.SetStateAction<any>>; 
    setUpdatedUser: React.Dispatch<React.SetStateAction<any>>;
    duplicateUsers: User[];
}

export default function Duplicates ({setPopupDisplayed, setUpdatedUser, duplicateUsers }: DuplicatesProps) {

    const [ selectedCountryIdx, setSelectedCountryIdx ] = useState("");
    const handleSelectCountry = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target;
        //@ts-ignore
        setSelectedCountryIdx(target.id);
    }

    const { CircleCheckIcon, CircleIcon } = GlobalIcons;
    
    const renderedUser = duplicateUsers.map((user, idx) => {
        const { country, id } = user;
        const btnStyles = " bg-none border-outline-none w-100 d-flex justify-content-between ";
        return ( country &&
            <li key = {id} className="mx-0 px-0 list-group-item border-outline-none">
                <button id = {`${idx}`} className= {btnStyles} onClick = {handleSelectCountry}>
                    {country}
                    {Number(selectedCountryIdx) === Number(idx) ? CircleCheckIcon(25,25) : CircleIcon(25,25)}
                </button>
            </li>
        )
    })

    const handleContinue = (e: MouseEvent) => {
        e.preventDefault();
        setUpdatedUser(() => duplicateUsers[Number(selectedCountryIdx)]);
        setPopupDisplayed(() => "send-token");
    };

    //styles
    const elementHeight = " h-256px";

    return (<>
        <h5> <strong>Select the country associated with your number</strong></h5>
        <hr className="mb-0"></hr>
        <div className= {elementHeight}>
            <ul className="list-group">
                {renderedUser}
            </ul>
        </div>
        <div className="my-4">
            <SubmitBtn  type = "submit" title = "Continue" handleClick={handleContinue}/>
        </div>
    </>)
}

