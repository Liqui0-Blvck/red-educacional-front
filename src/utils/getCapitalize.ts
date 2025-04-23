export function capitalizeFirstLetter(string: string | null | undefined) {
  if (string === null || string === undefined || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}