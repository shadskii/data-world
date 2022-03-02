function years() {
  return;
}

cube(`Populations`, {
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
    ...Object.fromEntries(
      Array(2008 - 1960)
        .fill(1960)
        .map((x, i) => {
          const year = x + i;
          return [
            `_${year}`,
            {
              sql: `year_${year}`,
              type: "number",
            },
          ];
        })
    ),
  },
});
