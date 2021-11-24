export const arrayToClass = (arr) => {
  let classArr = [];
  for (let el of arr) {
    if (typeof el === "object") {
      if (el[0]) classArr.push(el[1]);
    } else {
      classArr.push(el);
    }
  }
  return classArr.join(" ");
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
