import { COST_FORM } from "../components/cost/data";
import { REVENUE_FORM } from "../components/revenue/data";

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

export const YEARS = () => {
  const currentYear = new Date().getFullYear();
  const yearsPast = [];
  const yearsFuture = [];
  for (let i = 0; i < 5; i++) {
    yearsFuture.push(currentYear + i);
    yearsPast.unshift(currentYear - i - 1);
  }
  const combined = [...yearsPast, ...yearsFuture];
  return combined;
};

export const EXPENSE_TYPES = COST_FORM[3].options.filter(
  (el) => el.text !== "Select"
);

export const REVENUE_SOURCES = REVENUE_FORM[3].options.filter(
  (el) => el.text !== "Select"
);
