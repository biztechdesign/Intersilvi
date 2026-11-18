import type { Money } from "./commerce/types";

const formatters = new Map<string, Intl.NumberFormat>();

/** Formats a price for the English storefront, e.g. "SEK 128". */
export function formatMoney(money: Money, locale = "en-GB"): string {
  const key = `${locale}-${money.currency}`;
  let fmt = formatters.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: money.currency,
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    formatters.set(key, fmt);
  }
  return fmt.format(money.amount).replace(/ /g, " ");
}
