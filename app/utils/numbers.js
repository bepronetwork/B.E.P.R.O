import accounting from 'accounting';

export function numberWithCommas(x) {
    return accounting.formatNumber(x, 2)
}
