const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function faDigits(input: number | string): string {
  return input
    .toString()
    .replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

export function groupDigits(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function toman(n: number): string {
  return `${faDigits(groupDigits(n))} تومان`;
}

export function discountPercent(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function jalaliDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(typeof date === "string" ? new Date(date) : date);
}

export function faCompact(n: number): string {
  if (n >= 1_000_000_000) return `${faDigits((n / 1_000_000_000).toFixed(1))} میلیارد`;
  if (n >= 1_000_000) return `${faDigits((n / 1_000_000).toFixed(1))} میلیون`;
  if (n >= 1_000) return `${faDigits((n / 1_000).toFixed(1))} هزار`;
  return faDigits(n);
}