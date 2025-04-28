export function formatCurrency(value: number) {
    return Intl.NumberFormat('eng-us',
        {
            style: 'currency',
            currency: 'USD'
        }
    ).format(value)
}
