import React, { useEffect } from 'react';
import { TxtBtn } from "@/components/shared/btn";
import { signupNLogin_En } from "lib/global/languages/english";
import { User } from "lib/global/types";
import { MouseEventHandler } from "react";
import IntlTelInput, { CountryData } from 'react-intl-tel-input';

interface PhoneUserInputProps {
    handleUserName: MouseEventHandler<HTMLButtonElement>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function PhoneUserInput ({setUser, handleUserName}: PhoneUserInputProps) {
    
    const { use_email_text } = signupNLogin_En;

    const handlePhoneChange = (isValid: boolean, value: string, selectedCountryData: CountryData, fullNumber: string, extension: string,) => {
        setUser((prevUser: User) => ({
            ...prevUser,
            phoneNumber: value,
        }));
      };
    
    useEffect(() => {
        setUser((prevUser: User) => ({
            ...prevUser,
            dialCode: "1",
            country: "United States"
        }));
        const phoneStyles = document.querySelector("#phone");
        const flagContainer = phoneStyles?.querySelector(".flag-container");
        const selectedFlag = phoneStyles?.querySelector(".selected-flag");
        const input = phoneStyles?.querySelector("input");
        if (input){
            input.style.boxShadow = "none";
        };
        if (flagContainer){
            //@ts-ignore
            flagContainer.style.left= "auto";
        };
        if (selectedFlag){
            //@ts-ignore
            selectedFlag.style.backgroundColor= "none";
            //@ts-ignore
            selectedFlag.style.background= "none";
        };
    },[]);

    const handleSelectFlag = (currentNumber: string, selectedCountryData: CountryData,) => {
        setUser((prevUser: User) => ({
            ...prevUser,
            dialCode: selectedCountryData.dialCode,
            country: selectedCountryData.name
        }));
    };
    
    //Styles
    const phoneContainer = "bg-gray-200 intl-tel-input box-shadow-none border-outline-none h-40px border-radius-6px p-0 w-100";
    const phoneInput = "form-control box-shadow-none bg-gray-200 w-100 h-40px";

    return <div id = "phone" >
        <IntlTelInput
            containerClassName={phoneContainer}
            inputClassName={phoneInput} 
            preferredCountries={['us']}
            onPhoneNumberChange={handlePhoneChange}
            placeholder = ' '
            onSelectFlag = {handleSelectFlag}
            />
        <TxtBtn title = {use_email_text} handleClick={handleUserName}/>
    </div>
}