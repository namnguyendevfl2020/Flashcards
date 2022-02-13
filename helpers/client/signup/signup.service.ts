import { User } from 'lib/global/types';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '..';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const { NEXTJS_API_BASE_URL } = publicRuntimeConfig;

const intialSignup: User = (() => {
    if (typeof window !== 'undefined') { 
// @ts-ignore
        return JSON.parse(localStorage.getItem('signup'));
    } 
})()

const signupSubject = new BehaviorSubject(intialSignup);

const signupFn = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/signup`;
    return await fetchWrapper.post(url, user, signal);
}

const saveUrl = (url:string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('urlReturned', JSON.stringify(url));
      }
};

const returnUrl = () => {
    if (typeof window !== "undefined") {
        const url = localStorage.getItem('urlReturned');
        if (url) return JSON.parse(url);
      }
};
export const signupService = {
    signup: signupSubject.asObservable(),
    get value () { return signupSubject.value },
    signupFn,
    saveUrl,
    returnUrl
};