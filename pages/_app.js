import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from "react";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(null);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, [Router.events]);
  if (isLoading) {
    return <p>Cargando...</p>
  } else {
    return <Component {...pageProps} />
  }
}

export default MyApp
