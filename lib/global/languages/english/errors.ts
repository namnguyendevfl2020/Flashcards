export const signupErrors_En = {
    first_last_name_err_text: "What's your name?",
    invalid_username_err_text: "Please enter a valid email or phone number, you'll use it to log in or reset your password.",
    email_taken_text: "This email has already been taken.",
    phone_taken_text: "Phone number has already been taken.",
    password_err_text: "Please enter a combination of eight letters, numbers, and special characters (like ! and @).",
    birthday_err_text: "It looks like you're info was incorrect. Please enter the real birthday or age."
};

export const loginErrs_En = {
    notFound_username_err_text: "The phone number or email entered can not be found. Retry, or Create account",
    invalid_pw_text: "The password entered is wrong. Try again, or click Forgot password to reset it"
};

export const recoverPwErrors_En = (codeNums?: number) => ({
    notFound_username_err_text: "This isn't a phone number or email on record. Please try again with other information",
    empty_userName_err: "Please fill in the field",
    empty_code_err: "Please enter your code",
    isNaN_code_err: "It looks like you entered some letters. Your code is 6 numbers long",
    code_length_err: `You entered ${codeNums} numbers. Please check your code and try again`,
    wrong_code_err: "Your number doesn't match the code sent to your email or phone. Please try again"
});