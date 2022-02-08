cube(`populations`, {
  sql: ` SELECT * FROM \`bigquery-public-data.world_bank_global_population.population_by_country\``,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {
    numberOfCountries: {
      sql: `country`,
      type: "countDistinct",
    },
  },

  dimensions: {
    country: {
      sql: `country_code`,
      type: `string`,
    },
    _1960: {
      sql: `year_1960`,
      type: `number`,
    },
  },
});
