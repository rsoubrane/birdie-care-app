import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number: string | number) {
	return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
	return numeral(number).format('0.00a').replace('.00', '');
}
