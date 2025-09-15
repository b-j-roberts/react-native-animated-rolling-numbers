/**
 * Formats a number into a compact string representation (e.g., 1K, 1.5M).
 *
 * @param value - The numeric value to format.
 * @param fixedDecimal - Number of decimal places to show in compact notation. Defaults to 1.
 * @param fixedOnlyForCompact - If true, only applies decimal fixing for compact notation. Defaults to false.
 * @param useGrouping - Whether to include separator for thousands separators .
 * @param locales - The locale to use for number formatting. Defaults to "en-US".
 * @returns The formatted string representation of the number.
 */

export function formatCompactNumber(
  value: number,
  fixedDecimal: number = 1,
  fixedOnlyForCompact: boolean = false,
  useGrouping: boolean = false,
  locales: Intl.LocalesArgument = "en-US"
): string {
  const absValue = Math.abs(value);

  // Scientific notation for sextillion and above (10^21 and higher)
  if (absValue >= 1e21) {
    const exponent = Math.floor(Math.log10(absValue));
    const mantissa = value / Math.pow(10, exponent);

    // Format mantissa to have up to 3 significant digits
    const formattedMantissa = mantissa.toLocaleString(locales, {
      maximumSignificantDigits: 3,
      minimumSignificantDigits: 1,
      useGrouping: false,
    });

    return `${formattedMantissa}e${exponent}`;
  } else if (absValue >= 1e18) {
    // Quintillion (E)
    return (
      (value / 1e18).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "E"
    );
  } else if (absValue >= 1e15) {
    // Quadrillion (P)
    return (
      (value / 1e15).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "P"
    );
  } else if (absValue >= 1_000_000_000_000) {
    // Trillion (T)
    return (
      (value / 1_000_000_000_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "T"
    );
  } else if (absValue >= 1_000_000_000) {
    // Billion (B)
    return (
      (value / 1_000_000_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "B"
    );
  } else if (absValue >= 1_000_000) {
    // Million (M)
    return (
      (value / 1_000_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "M"
    );
  } else if (absValue >= 1_000) {
    // Thousand (K)
    return (
      (value / 1_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
      }) + "K"
    );
  } else {
    return value.toFixed(fixedOnlyForCompact ? 0 : fixedDecimal);
  }
}
