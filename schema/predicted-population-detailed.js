cube(`DetailedPopulation`, {
  sql: ` SELECT * FROM \`bigquery-public-data.census_bureau_international.midyear_population_agespecific\``,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {},

  dimensions: {
    population: {
      sql: `population`,
      type: "number",
    },
    sex: {
      sql: "sex",
      type: "string",
    },
    age: {
      sql: "age",
      type: "number",
    },
    country: {
      sql: `country_code`,
      type: "string",
    },
    year: {
      sql: `PARSE_TIMESTAMP("%Y", CAST(year AS STRING))`,
      type: "time",
    },
  },
});
