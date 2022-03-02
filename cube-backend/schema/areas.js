cube(`Areas`, {
  sql: ` SELECT * FROM \`bigquery-public-data.census_bureau_international.country_names_area\``,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  dimensions: {
    country: {
      sql: `country_code`,
      type: `string`,
    },
    area: {
      sql: `country_area`,
      type: `number`,
    },
  },
});
