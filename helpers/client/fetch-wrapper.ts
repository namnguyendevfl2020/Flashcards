import { Card, Deck, Signal, User } from 'lib/global/types';
import { loggedInService } from './logins';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

const headers = new Headers();
headers.append("Content-Type", "application/json");

interface Options {
    method: string;
    headers: Headers;
    body?: string;
    signal?: any;
}

async function fetchJson (url: string, options: Options) {
    try {
        const response = await fetch(url, options);

        if (response.status === 204) return null;
        const payload = await response.json();
        
        if (payload.error) {
            const { error } = payload;
            return Promise.reject(error);
        }
        return payload.data
    } catch(error: any) {
        if (error.name !== "AbortError") {
            return Promise.reject({message: error.message});
        }
    }
}

async function get(url: string, signal: any) {
    const requestOptions = {
        method: 'GET',
        headers: headers,
        signal,
    };
    return await fetchJson(url, requestOptions);
};

function post(url: string, body: Deck | Card | User | string , signal: Signal) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({data:body}),
        signal
    };
    return fetchJson(url, requestOptions);
};

function put(url: string, body: Deck | Card | string, signal: Signal) {
    const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({data: body}),
        signal
    };
    return fetchJson(url, requestOptions);
};

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string, signal: Signal) {
    const requestOptions = {
        method: 'DELETE',
        headers: headers,
        signal
    };
    return fetchJson(url, requestOptions);
};
