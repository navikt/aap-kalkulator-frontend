import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloclient = useApollo(pageProps)
  return <ApolloProvider client={apolloclient}><Component {...pageProps} /></ApolloProvider>
}

export default MyApp
