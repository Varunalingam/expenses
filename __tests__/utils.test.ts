import { formatCurrency } from '../src/utils/currency';
import { formatDate } from '../src/utils/date';

describe('formatCurrency', () => {
  it('formats positive numbers correctly in USD', () => {
    const result = formatCurrency(1234.56, 'USD', 'en-US');
    expect(result).toBe('$1,234.56');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0, 'USD', 'en-US');
    expect(result).toBe('$0.00');
  });

  it('formats negative amounts correctly', () => {
    const result = formatCurrency(-50, 'USD', 'en-US');
    expect(result).toBe('-$50.00');
  });
});

describe('formatDate', () => {
  it('returns Today for today date', () => {
    const today = new Date().toISOString();
    expect(formatDate(today)).toBe('Today');
  });

  it('returns Yesterday for yesterday date', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    expect(formatDate(yesterday)).toBe('Yesterday');
  });

  it('formats older dates', () => {
    const fixedDate = new Date('2024-01-15T12:00:00Z').toISOString();
    const result = formatDate(fixedDate);
    expect(result).toMatch(/Jan 15/);
  });
});
