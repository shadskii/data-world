import {
  Filter,
  Query,
  ResultSet,
  TimeDimension,
  TQueryOrderArray,
  TQueryOrderObject,
} from "@cubejs-client/core";
import { Ref, ref, watch } from "vue";
import { cubejsApi } from "../api";
import { CubeDimensions, CubeMeasures } from "./cube-types";

export function useCubeQuery(query: Ref<TypedQuery | undefined>): {
  error: Ref<Error | undefined>;
  isLoading: Ref<boolean>;
  // progress: ProgressResponse;
  resultSet: Ref<TypedResultSet | undefined>;
  refetch: () => Promise<void>;
} {
  const isLoading = ref(false);
  const resultSet = ref<TypedResultSet | undefined>();
  const error = ref<Error | undefined>();

  async function refetch() {
    isLoading.value = true;

    if (!query.value) return;

    try {
      resultSet.value = (await cubejsApi.load(
        query.value as Query
      )) as unknown as TypedResultSet;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      }
    }
    isLoading.value = false;
  }

  watch(query, refetch, { immediate: true });

  return {
    isLoading,
    resultSet,
    error,
    refetch,
  };
}

/**
 * A Cube.js ResultSet with added type safety.
 */
export interface TypedResultSet extends Omit<ResultSet, "tablePivot"> {
  tablePivot(): (CubeDimensions & CubeMeasures)[];
}

/**
 * A Cube.js query with added type safety.
 */
export interface TypedQuery {
  measures?: (keyof CubeMeasures)[];
  dimensions?: (keyof CubeDimensions)[];
  filters?: Filter[];
  timeDimensions?: TimeDimension[];
  segments?: string[];
  limit?: number;
  offset?: number;
  order?: TQueryOrderObject | TQueryOrderArray;
  timezone?: string;
  renewQuery?: boolean;
  ungrouped?: boolean;
}
