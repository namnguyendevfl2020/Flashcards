import '@/styles/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { loggedInService } from 'helpers/client/logins';
import { fetchCards } from 'helpers/client/cards/cardsSlice';
import { fetchDecks } from 'helpers/client/decks/decksSlice';

export default function MyApp({ Component, pageProps }: AppProps) {
  
  const router = useRouter();
  const [ error, setError ] = useState();
  const [ authorized, setAuthorized ] = useState(false);
  
  useEffect(() => {
    verifyUser(router.pathname);
    
    //deny access to the app b/f verify the user
    const deniAuth = () => setAuthorized(false);

    router.events.on('routeChangeStart', deniAuth);
    router.events.on('routeChangeComplete', verifyUser);

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', deniAuth);
        router.events.off('routeChangeComplete', verifyUser);
    }
  }, []);

  const verifyUser = (path: string) => {
    const publicPaths = ['/accounts/login'];
    //if user is not logged in and the path is not publicly accessible
    //Then redirect to the login page
    if (!loggedInService.value && !publicPaths.includes(path)) {
        setAuthorized(false);
        loggedInService.saveUrl(path);
        router.push('/accounts/login');
    } else {
      const loggedIn = loggedInService.value
      if (loggedIn) {
        store.dispatch(fetchDecks(`${loggedIn.id}`))
        store.dispatch(fetchCards(`${loggedIn.id}`))
      }
      setAuthorized(true);
    }
  }

  if (error !== undefined) {
    const { status, message } = error;
    return <Error statusCode = {status} title = {message}/>
  };

  return ( <>
      <Provider store = {store} >
        <Head>
          <title>Flashcard</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
        </Head>
        <Header />
        <div className="container">
          {
            authorized &&
            <Component {...pageProps} setAuthorized = {setAuthorized} />
          }
        </div>
      </Provider>
    </>)
}
