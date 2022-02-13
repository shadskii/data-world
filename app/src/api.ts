import cubejs from "@cubejs-client/core";
import { computed, onMounted, ref, Ref, watch } from "vue";
import { CountryCode3 } from "./types/countries";

export const cubejsApi = cubejs(import.meta.env.VITE_CUBEJS_TOKEN, {
  apiUrl: `http://localhost:4000/cubejs-api/v1`,
});

export function useYearPopulationData(
  year: Ref<number>
): Ref<Record<CountryCode3, number> | undefined> {
  const data = ref<Record<CountryCode3, number>>();
  async function load() {
    const yearDimension = `Populations._${year.value}`;
    const cubeData = await cubejsApi.load({
      filters: [],
      dimensions: ["Populations.country", yearDimension],
    });

    data.value = Object.fromEntries(
      cubeData.tablePivot().map((row) => {
        return [row["Populations.country"], row[`Populations._${year.value}`]];
      })
    );
  }
  watch(year, load);
  onMounted(() => {
    load();
  });

  return data;
}
