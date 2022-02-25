cube(`MortalityLifeExpectancy`, {
  sql: /*sql*/ `
  SELECT * 
  FROM bigquery-public-data.census_bureau_international.mortality_life_expectancy
  `,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {},

  dimensions: {
    key: {
      sql: `CONCAT(${MortalityLifeExpectancy}.country_code, '-', ${MortalityLifeExpectancy}.year)`,
      type: "string",
      primaryKey: true,
    },
    lifeExpectancy: {
      sql: `${MortalityLifeExpectancy}.life_expectancy`,
      type: "number",
    },
    infantMortality: {
      sql: `${MortalityLifeExpectancy}.infant_mortality / 10.0`,
      type: "number",
    },
  },
});
