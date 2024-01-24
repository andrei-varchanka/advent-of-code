
export function getNumericMatrix(data: string) {
  return data.replace(/\r/g, '').split('\n').map(row => row.split('').map(Number));
}

export function getStringMatrix(data: string) {
  return data.replace(/\r/g, '').split('\n').map(row => row.split(''));
}