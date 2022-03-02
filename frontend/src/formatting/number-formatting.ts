const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

/**
 * Adds an ordinal suffix to a number. (i.e. 1st, 2nd, 3rd, 4th).
 *
 * @param number Number to add ordinal suffix to.
 * @returns A number with the correct ordinal suffix.
 */
export function formatOrdinal(number: number): string {
  const ordinalRules = new Intl.PluralRules("en", {
    type: "ordinal",
  });
  const suffix = suffixes.get(ordinalRules.select(number)) || "";
  return `${number}${suffix}`;
}
