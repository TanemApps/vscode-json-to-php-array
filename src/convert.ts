export const convertJsonToPhpArray = (jsonValue: string) => {
  let php = "";
  let isInsideString = false;
  let previousChar = "";

  for (let char of jsonValue.split("")) {
    if (char === '"' && previousChar !== "\\") {
      isInsideString = !isInsideString;
    }

    if (!isInsideString) {
      if (char === ":") {
        char = "=>";

        if (!/\s/.test(previousChar)) {
          char = " " + char;
        }
      } else if (char === "{") {
        char = "[";
      } else if (char === "}") {
        char = "]";
      }
    }

    php += char;
    previousChar = char;
  }

  return php;
};
