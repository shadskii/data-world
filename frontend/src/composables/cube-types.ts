import { Sex } from "../stores/detailed-population-data";

/**
 * Contains all dimensions in all cubes.
 *
 * This must be kept in sync with the cube.js schema.
 */
export interface CubeDimensions {
  /**
   * Fips country code.
   */
  "PredictedPopulation.country": string;

  /**
   * Year of the population data.
   */
  "PredictedPopulation.year": string;

  /**
   * The total population of the world.
   */
  "PredictedPopulation.totalPopulation": number;

  "DetailedPopulation.key": string;

  /**
   * Age/sex specific population.
   */
  "DetailedPopulation.population": number;

  /**
   * Population sex.
   */
  "DetailedPopulation.sex": Sex;

  /**
   * Population age.
   */
  "DetailedPopulation.age": number;

  /**
   * Fips country code.
   */
  "DetailedPopulation.country": string;

  /**
   * Year of population data.
   */
  "DetailedPopulation.year": string;

  "MortalityLifeExpectancy.key": string;

  /**
   * Life expectancy in years.
   */
  "MortalityLifeExpectancy.lifeExpectancy": number;

  /**
   * Infant mortality rate in percent.
   */
  "MortalityLifeExpectancy.infantMortality": number;

  /**
   * Fips country code.
   */
  "Areas.country": string;

  /**
   * Country area in square kilometers.
   */
  "Areas.area": number;
}

/**
 * Contains all measures in all cubes.
 *
 * This must be kept in sync with the cube.js schema.
 */
export interface CubeMeasures {
  /**
   * Total males.
   */
  "DetailedPopulation.totalMales": number;

  /**
   * Total females.
   */
  "DetailedPopulation.totalFemales": number;

  /**
   * Total number of countries.
   */
  "PredictedPopulation.numberOfCountries": number;
}

export type DetailedPopulation = {
  country: string;
  dimensions: {
    country: string;
    popilation: number;
    sex: Sex;
    age: number;
    year: string;
  };
  measrures: {
    totalMales: number;
    totalFemales: number;
  };
};
