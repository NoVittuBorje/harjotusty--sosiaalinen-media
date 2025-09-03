import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { offsetLimitPagination } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      'Apollo-Require-Preflight': 'true',
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createUploadLink({
  uri: "http://localhost:4000",
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getfeedposts: {
          ...offsetLimitPagination(),
          keyArgs: ["feedname","orderBy"],
        },
        getpostcomments: {
          ...offsetLimitPagination(),
          keyArgs: ["postid"],
        },
        getpopularposts: {
          ...offsetLimitPagination(),
          keyArgs: ["orderBy"],
        },
        getuserposts: {
          ...offsetLimitPagination(),
          keyArgs: ["userid"],
        },
        getusercomments: {
          ...offsetLimitPagination(),
          keyArgs: ["userid"],
        },
        getusersubs: {
          ...offsetLimitPagination(),
          keyArgs: ["userid"],
        },
        getuserownedfeeds: {
          ...offsetLimitPagination(),
          keyArgs: ["userid"],
        },
      },
    },
  },
});
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: cache,
  link: splitLink,
});
const theme = createTheme({
  cssVariables: true,
  typography: {
    button: {
      textTransform: "none",
    },
  },

  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
      contrastText: "#f5f1f2ff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ThemeProvider>
);
