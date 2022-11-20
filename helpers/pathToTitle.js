// import { uppercaseFirstLetter } from "./uppercaseFirstLetter.js";

export const pathToTitle = (path) => {
  const pathArr = path.split("/").reverse();
  const pathArrUppercase = pathArr.map((string) =>
    string.includes("-")
      ? uppercaseFirstLetter(string.split("-").join(" "))
      : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
  return path === "/" ? "Home" : pathArrUppercase.join(" | ");
  //   return path;
};
