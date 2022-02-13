import { fetchWrapper } from "helpers/client";
import { Card, Signal } from "lib/global/types";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const { NEXTJS_API_BASE_URL } = publicRuntimeConfig;

async function listCards(userId: string, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${userId}/cards`;
    return await fetchWrapper.get(url, signal);
  }
  
async function create(card: Card, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${card.userId}/cards/new`;
    return await fetchWrapper.post(url, card, signal);
  }
  
async function update(updatedCard: Card, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${updatedCard.userId}/cards/${updatedCard.id}/edit`;
    return await fetchWrapper.put(url, updatedCard, signal);
  }
  
async function _delete(userId: string, cardId: string, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${userId}/cards/${cardId}/delete`;
    return await fetchWrapper.delete(url, signal);
  }

export const cardAPICalls = {
    listCards,
    create,
    update,
    _delete
}