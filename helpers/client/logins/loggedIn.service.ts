import { User } from 'lib/global/types';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '..';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const { NEXTJS_API_BASE_URL } = publicRuntimeConfig;

interface LoggedinType {
    id: number;
    username: string;
    password: string;
};

const loggedIn: LoggedinType = (() => {
    if (typeof window !== 'undefined') { 
// @ts-ignore
        return JSON.parse(localStorage.getItem('loggedIn'));
    }
})()

const loggedInSubject = new BehaviorSubject(process.browser && loggedIn);
  
const signin = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/login`;
    const matchedUser = await fetchWrapper.post(url, user, signal);
    loggedInSubject.next(matchedUser);
    return matchedUser;
}

const saveUrl = (url:string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('urlReturned', JSON.stringify(url));
      }
}

const returnUrl = () => {
    if (typeof window !== "undefined") {
        const url = localStorage.getItem('urlReturned');
        if (url) return JSON.parse(url);
      }
}

export const loggedInService = {
    loggedIn: loggedInSubject.asObservable(),
    get value () { return loggedInSubject.value },
    signin,
    saveUrl,
    returnUrl,
};