
type AmountInput = number | string | null | undefined;


export function formatToDollars(amount: AmountInput): string {
  // Handle null, undefined, or empty values
  if (amount == null || amount === '') return '$0.00';
  
  // Convert to number if it's a string
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle invalid numbers
  if (isNaN(num)) return '$0.00';
  
  // Format with commas and 2 decimal places
  return '$' + num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}