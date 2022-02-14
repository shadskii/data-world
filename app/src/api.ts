import cubejs from "@cubejs-client/core";
import { onMounted, ref, Ref, watch } from "vue";
import {
  CountryCode2,
  CountryCode3,
  countryCodeConversion,
} from "./types/countries";

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

export function useCountryArea(
  country: Ref<CountryCode3 | undefined>
): Ref<number> {
  const data = ref<number>(0);
  async function load() {
    if (!country.value) return;
    const countryCode: CountryCode2 = countryCodeConversion[country.value];
    const cubeData = await cubejsApi.load({
      filters: [
        {
          member: "Areas.country",
          operator: "equals",
          values: [`${countryCode}`],
        },
      ],
      dimensions: ["Areas.area", "Areas.country"],
    });
    data.value = (cubeData.tablePivot()?.[0]?.["Areas.area"] as number) ?? 0;
  }
  watch(country, load, { immediate: true });

  return data;
}
