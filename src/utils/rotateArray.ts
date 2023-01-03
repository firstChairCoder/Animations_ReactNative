export function rotateArray(arr: string[], count: number) {
  count -= arr.length * Math.floor(count / arr.length);
  // eslint-disable-next-line prefer-spread
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}
