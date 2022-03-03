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
import { Sex } from "../stores/detailed-population-data";

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

interface CubeDimensions {
  "PredictedPopulation.totalPopulation": number;
  "PredictedPopulation.country": string;
  "PredictedPopulation.year": string;

  "DetailedPopulation.key": string;
  "DetailedPopulation.population": number;
  "DetailedPopulation.sex": Sex;
  "DetailedPopulation.age": number;
  "DetailedPopulation.country": string;
  "DetailedPopulation.year": string;

  "MortalityLifeExpectancy.key": string;
  "MortalityLifeExpectancy.lifeExpectancy": number;
  "MortalityLifeExpectancy.infantMortality": number;

  "Areas.country": string;
  "Areas.area": number;
}

interface CubeMeasures {
  "DetailedPopulation.totalMales": number;
  "DetailedPopulation.totalFemales": number;

  "PredictedPopulation.numberOfCountries": number;
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
