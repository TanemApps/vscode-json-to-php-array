export function convertJsonToPhpArray(json: string) {
  let php = '';
  let isInsideString = false;
  let previousChar = null;

  for (let char of e.split('')) {
    if (char == '"' && previousChar !== '\\') {
      isInsideString = !isInsideString;
    }

    if (!isInsideString) {
      if (char == ':') {
        char = '=>';

        if (!/\s/.test(previousChar)) {
          char = ' ' + char;
        }
      } else if (char == '{') {
        char = '[';
      } else if (char == '}') {
        char = ']';
      }
    }

    php += char;
    previousChar = char;
  }

  return php;
}