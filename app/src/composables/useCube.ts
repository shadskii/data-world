import { Query, ResultSet } from "@cubejs-client/core";
import { Ref, ref, watch } from "vue";
import { cubejsApi } from "../api";

export function useCubeQuery(query: Ref<Query>) {
  const isLoading = ref(false);
  const resultSet = ref<ResultSet<any> | undefined>();
  const error = ref<Error | undefined>();

  async function doLoad() {
    isLoading.value = true;

    try {
      resultSet.value = await cubejsApi.load(query.value);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      }
    }
    isLoading.value = false;
    return resultSet;
  }

  watch(query, doLoad, { immediate: true });

  return {
    isLoading,
    resultSet,
    error,
  };
}
