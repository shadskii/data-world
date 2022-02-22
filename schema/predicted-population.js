cube(`PredictedPopulation`, {
  sql: ` SELECT * FROM \`bigquery-public-data.census_bureau_international.midyear_population\``,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {
    numberOfCountries: {
      sql: `country_code`,
      type: "countDistinct",
    },
  },

  dimensions: {
    totalPopulation: {
      sql: `${PredictedPopulation}.midyear_population`,
      type: "number",
    },
    country: {
      sql: `country_code`,
      type: "string",
    },
    year: {
      sql: `PARSE_TIMESTAMP("%Y", CAST(${PredictedPopulation}.year AS STRING))`,
      type: "time",
    },
  },
});
