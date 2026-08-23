/**
 * Formats numbers into currency format (Indian Rupee ₹).
 * Gracefully handles zero, negative numbers, small decimals, and scientific notation.
 */
export function formatINR(val: number, decimalDigits: number = 2): string {
  if (val === 0) return '₹0.00';

  const absVal = Math.abs(val);

  // Very small numbers (e.g. 5e-13 or 0.00001623)
  if (absVal < 0.0001) {
    const formatted = val.toExponential(4);
    return val < 0 ? `-₹${formatted.replace('-', '')}` : `₹${formatted}`;
  }

  // Small decimals (less than 1)
  if (absVal < 1) {
    const formatted = val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
    return val < 0 ? `-₹${formatted.replace('-', '')}` : `₹${formatted}`;
  }

  // Standard numbers
  const formatted = val.toLocaleString('en-IN', {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  });

  return val < 0 ? `-₹${formatted.replace('-', '')}` : `₹${formatted}`;
}

/**
 * Formats token balances / holdings.
 */
export function formatTokenAmount(val: number): string {
  if (val === 0) return '0';
  const absVal = Math.abs(val);

  if (absVal < 1e-6) {
    return val.toExponential(4);
  }

  if (absVal < 1) {
    return val.toLocaleString('en-US', {
      maximumFractionDigits: 6,
    });
  }

  return val.toLocaleString('en-US', {
    maximumFractionDigits: 4,
  });
}
