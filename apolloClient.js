import { ApolloClient, InMemoryCache } from "@apollo/client";
import { url } from "./Hooks/apiHooks";

const client = new ApolloClient({
  uri: url.replace("api", "reimbursement_graph_ql"),
  cache: new InMemoryCache(),
});

export default client;
