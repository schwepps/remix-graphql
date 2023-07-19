import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


export default function App() {

  const graphQLClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://countries.trevorblades.com/graphql',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
         <ApolloProvider client={graphQLClient}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ApolloProvider>
      </body>
    </html>
  );
}
