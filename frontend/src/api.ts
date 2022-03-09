import cubejs from "@cubejs-client/core";

export const cubejsApi = cubejs(import.meta.env.VITE_CUBEJS_TOKEN, {
  apiUrl: import.meta.env.VITE_CUBEJS_URL,
});
