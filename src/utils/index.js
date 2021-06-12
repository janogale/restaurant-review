// delay operation in ms
export function delay(number) {
  return new Promise((res) => setTimeout(res, number));
}
