export default function formatMoney(priceInCents = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check for whole dollar amount
  if (priceInCents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(priceInCents / 100);
}
