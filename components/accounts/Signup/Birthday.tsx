import { ReactLibIcons } from "@/components/shared/Icons";
import { signupNLogin_En } from "lib/global/languages/english";
import { User } from "lib/global/types";

interface BirthdayProps {
    user: User;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement> ) => void;
}

export default function Birthday ({user, handleChange}: BirthdayProps) {
    const { age_month_text, age_day_text, age_year_text } = signupNLogin_En;
    const now = new Date();
    const currentYear = now.getFullYear()
    const dayList = (month: number | undefined) => {
        const months30 = ["4","6","9","11"];
        const dayNum = (() => {
            if (month !== undefined && months30.includes(`${month}`)) return 30;
            return 31;
        })();
        const days = [];
        for (let i = 1; i<(dayNum + 1); i++) days.push(i);
        return days.map(day => <option key = {day} value = {day}>{day}</option>);
    } 
    const months = [];
    for (let i = 1; i < 13; i++) months.push(i);
    const monthList = months.map(month => <option key = {month} value = {month}>{month}</option>);
    const years = [];
    for (let i = 1900; i<currentYear-12; i++) years.push(i);
    const yearList = years.map(year => <option key = {year} value = {year}>{year}</option>);

    // Input Styles
    const inputStyle = " h-40px border-radius-6px px-2";
    const birthdayFieldStyle = " pe-1 position-relative z-index-7";
    const birthday_selectStyle = " border-outline-none bg-none w-148px ps-2 text-start";
    const select_chervon = "position-absolute top-6D5px r-5px z-index-N1";

    return (
        <>
     <div className = "d-flex justify-content-between">
        <div className = {birthdayFieldStyle}> 
            <select
                className = {inputStyle + birthday_selectStyle}
                id = "month"
                name = "ageMonth"
                value = {user.ageMonth}
                onChange = {e => handleChange(e)}
                >
                <option> {age_month_text} </option>
                {monthList}
            </select>
            <div className = {select_chervon}>
                <ReactLibIcons type = "down-chevron"/>
            </div>
        </div>
        <div className = {birthdayFieldStyle}> 
            <select
                className = {inputStyle + birthday_selectStyle}
                id = "day"
                name = "ageDay"
                value = {user.ageDay}
                onChange = {handleChange}
                >
                <option> {age_day_text} </option>
                {dayList(user.ageMonth)}
            </select>
            <div className = {select_chervon}>
                <ReactLibIcons type = "down-chevron"/>
            </div>
        </div>
        <div className = {birthdayFieldStyle}>  
            <select
                className = {inputStyle + birthday_selectStyle}
                id = "year"
                name = "ageYear"
                value = {user.ageYear}
                onChange = {handleChange}
                required
                >
                <option> {age_year_text}</option>
                {yearList}                          
            </select>
            <div className = {select_chervon}>
                <ReactLibIcons type = "down-chevron"/>
            </div>
        </div>
        </div>
        </>
    )
}