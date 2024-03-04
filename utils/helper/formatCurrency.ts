export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
};