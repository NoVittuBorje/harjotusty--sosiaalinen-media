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
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { offsetLimitPagination } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      "Apollo-Require-Preflight": "true",
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

var linktobackend = "http://localhost:3000"
const deployment = false
if(deployment){
  linktobackend = "https://backend-harjotus-sosi.fly.dev/"
}
const httpLink = createUploadLink({
  uri: `${linktobackend}`,
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getfeedposts: {
          ...offsetLimitPagination(),
          keyArgs: ["feedname", "orderBy"],
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
const wsLink = new GraphQLWsLink(createClient({ url: `ws://${linktobackend}` }));
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
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#ffffffff",
          dark:"#f7f7f7ff",
          hover:"#f0f0f0ff",
          button:"#e2e2e2ff",
        },
        secondary: {
          main: "#000000ff",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#363535ff",
          dark:"#2c2c2cff",
          hover:"#444343ff",
          button:"#3d3c3cff",
        },
        primary: {
          main: "#ffffff",
          button:"#3d3c3cff",
          error:"#d32f2f",
        },
        secondary: {
          main: "#ffffff",
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: ".theme-%s",
  },

  typography: {
    button: {
      textTransform: "none",
    },
  },

  
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline></CssBaseline>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ThemeProvider>
);
