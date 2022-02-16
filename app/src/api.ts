import cubejs from "@cubejs-client/core";

export const cubejsApi = cubejs(import.meta.env.VITE_CUBEJS_TOKEN, {
  apiUrl: `http://localhost:4000/cubejs-api/v1`,
});
