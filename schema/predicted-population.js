cube(`PredictedPopulation`, {
  sql: ` SELECT * FROM \`bigquery-public-data.census_bureau_international.midyear_population_agespecific\``,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {
    numberOfCountries: {
      sql: `country_code`,
      type: "countDistinct",
    },
    population: {
      sql: `population`,
      type: "sum",
    },
  },

  dimensions: {
    country: {
      sql: `country_code`,
      type: "string",
    },
    year: {
      sql: `PARSE_TIMESTAMP("%Y", CAST(year AS STRING))`,
      type: "time",
    },
    age: {
      sql: `age`,
      type: "number",
    },
  },
});
