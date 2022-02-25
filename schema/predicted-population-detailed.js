cube(`DetailedPopulation`, {
  sql: /*sql*/ `
  SELECT * 
  FROM bigquery-public-data.census_bureau_international.midyear_population_agespecific
  `,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {},

  dimensions: {
    key: {
      sql: `CONCAT(${DetailedPopulation}.country_code, '-', ${DetailedPopulation}.year)`,
      type: "string",
      primaryKey: true,
    },
    population: {
      sql: `${DetailedPopulation}.population`,
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
      sql: /*sql*/ `PARSE_TIMESTAMP("%Y", CAST(${DetailedPopulation}.year AS STRING))`,
      type: "time",
    },
  },
  joins: {
    PredictedPopulation: {
      relationship: "hasOne",
      sql: /*sql*/ `
        ${PredictedPopulation}.country_code = ${DetailedPopulation}.country_code
        AND ${PredictedPopulation}.year = ${DetailedPopulation}.year
      `,
    },
    MortalityLifeExpectancy: {
      relationship: "hasOne",
      sql: /*sql*/ `
        ${MortalityLifeExpectancy}.country_code = ${DetailedPopulation}.country_code
        AND ${MortalityLifeExpectancy}.year = ${DetailedPopulation}.year
        `,
    },
  },
});
