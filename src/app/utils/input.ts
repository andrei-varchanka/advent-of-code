export function getLines(data: string): string[] {
  return data.replace(/\r/g, '').split('\n');
}

export function getNumericMatrix(data: string) {
  return getLines(data).map(row => row.split('').map(Number));
}

export function getStringMatrix(data: string) {
  return getLines(data).map(row => row.split(''));
}