import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://dataset.uz/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const STORAGE_KEY = "device-id";
  const deviceId = localStorage.getItem(STORAGE_KEY);
  if (!deviceId) {
    const newDeviceId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, newDeviceId);
  }
  return {
    headers: {
      ...headers,
      "X-Device-Id": deviceId,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
