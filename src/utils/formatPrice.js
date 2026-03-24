/**
 * Formats raw numbers into Indian Rupee currency display.
 * Example: 8999 -> ₹8,999
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
