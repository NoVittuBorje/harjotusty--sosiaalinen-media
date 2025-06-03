import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material";

const authLink = setContext((_, { headers }) => {  
  const token = localStorage.getItem('token')  
  return {    
    headers: {      
    ...headers,
    authorization: token ? `Bearer ${token}` : null,
            }  
        }})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(createClient({  url: 'ws://localhost:4000',}))
const splitLink = split(({ query }) => {    
  const definition = getMainDefinition(query)    
  return(definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
        )},
        wsLink,
        authLink.concat(httpLink))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})
const theme = createTheme({
  cssVariables:true,
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <ApolloProvider client={client}>    
        <App />
    </ApolloProvider>
  </BrowserRouter>
  </ThemeProvider>
)