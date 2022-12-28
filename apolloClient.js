import { ApolloClient, InMemoryCache } from "@apollo/client";
import { url } from "./Hooks/apiHooks";

const client = new ApolloClient({
  uri: url
    ? url.replace("api", "reimbursement_graph_ql")
    : "https://server.reimbursements.live/reimbursement_graph_ql/",
  cache: new InMemoryCache(),
});

export default client;
