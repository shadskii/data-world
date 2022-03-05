import { Sex } from "../stores/detailed-population-data";

/**
 * Contains all dimensions in all cubes.
 *
 * This must be kept in sync with the cube.js schema.
 */
export interface CubeDimensions {
  "PredictedPopulation.country": string;
  "PredictedPopulation.year": string;
  "PredictedPopulation.totalPopulation": number;

  "DetailedPopulation.key": string;
  "DetailedPopulation.population": number;
  "DetailedPopulation.sex": Sex;
  "DetailedPopulation.age": number;
  "DetailedPopulation.country": string;
  "DetailedPopulation.year": string;

  "MortalityLifeExpectancy.key": string;
  "MortalityLifeExpectancy.lifeExpectancy": number;
  "MortalityLifeExpectancy.infantMortality": number;

  "Areas.country": string;
  "Areas.area": number;
}

/**
 * Contains all measures in all cubes.
 *
 * This must be kept in sync with the cube.js schema.
 */
export interface CubeMeasures {
  "DetailedPopulation.totalMales": number;
  "DetailedPopulation.totalFemales": number;

  "PredictedPopulation.numberOfCountries": number;
}
