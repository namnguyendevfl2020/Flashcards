import { User } from "lib/global/types";
import { fetchWrapper } from "..";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const { NEXTJS_API_BASE_URL } = publicRuntimeConfig;

const _findUser = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/recoverPw`;
    return await fetchWrapper.post(url, user, signal);
}

const sendToken = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/recoverPw`;
    return await fetchWrapper.post(url, user, signal);
}

const verifyToken = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/recoverPw`;
    return await fetchWrapper.post(url, user, signal);
}

const updatePw = async (user: User, signal: AbortSignal) => {
    const url = `${NEXTJS_API_BASE_URL}/accounts/recoverPw`;
    return await fetchWrapper.post(url, user, signal);
}

export const recoverPwService = {
    findUser: _findUser,
    sendToken,
    verifyToken,
    updatePw
};