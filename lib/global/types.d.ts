export interface Card {
    id?:string;
    cardId?: string;
    front: string;
    back: string;
    deckId: string;
    createdAt?: string;
    updatedAt?: string;
    userId:string;
};
  
export interface Deck {
  id?: string,
  deckId?: string;
  name: string;
  description: string;
  createdAt?: any;
  updatedAt?: any;
  cards?: Card[];
  userId: string;
};

export interface User {
  id?: number,
  firstName?: string,
  lastName?: string,
  userName: string,
  password?: string,
  ageDay?: number,
  ageMonth?: number,
  ageYear?: number, 
  age?: number | string | undefined,
  birthday?: string | null,
  createdAt?: any;
  updatedAt?: any;
  returnUrl?: string;
  guestMode?: boolean;
  phoneNumber?: string |undefined;
  dialCode?: string | null;
  country?: string| null;
  email?: string | undefined;
};

export interface DbUser {
  user_id?: number,
  first_name?: string,
  last_name?: string,
  user_name: string,
  password?: string,
  age?: number | string | undefined,
  birthday?: string | null,
  created_at?: any;
  updated_at?: any;
  phone_number?: string |undefined;
  dial_code?: string | null;
  country?: string| null;
  email?: string | undefined;
};

interface ErrorType {
  message: string;
  status?: number | string;
  firstName?: string;
  lastName?: string;
};

export type Signal = any;