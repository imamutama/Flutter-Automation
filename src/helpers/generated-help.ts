import { promises as fs } from "fs";

import data from "./data";

/**
 * Generates a random phone number.
 *
 * @returns A string representing the generated phone number.
 */
export function randomNumber(): string {
  const min = 100000;
  const max = 100000000;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return "089" + random.toString();
}

export const readFileJson = async (file: string): Promise<JSON> => {
  const data = await fs.readFile(file, "utf8");
  const jsonObject = JSON.parse(data);
  return jsonObject;
};

/**
 * Generates a random code voucher.
 *
 * @returns {string} The generated code voucher.
 */
export function randomCode(): string {
  return "SDET" + Math.floor(Math.random() * 900000 + 100000).toString(36);
}

/**
 * Generates a strongly typed start date string.
 *
 * @returns {string} The generated start date string.
 */
export function startDate(): string {
  const now = Date.now();
  const date = new Date(now - (now % 86400000));
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Generates a strongly typed time string.
 *
 * @returns {string} The generated time string.
 */
export function getTime(): string {
  const currentDate: Date = new Date();
  const hours: string = currentDate.getHours().toString().padStart(2, "0");
  const minutes: string = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds: string = currentDate.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Generates a strongly typed time string.
 *
 * @returns {string} The generated time string.
 */
export function getTimeContent(): string {
  const currentDate = new Date();
  return `${currentDate.getHours().toString().padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Generates a strongly typed date string in the format 'year/month/day'.
 *
 * @returns {string} The generated date string.
 */
export function startDateContent(): string {
  const date = new Date();
  const yearString = date.getFullYear().toString().padStart(4, "0");
  const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayString = date.getDate().toString().padStart(2, "0");
  return `${yearString}/${monthString}/${dayString}`;
}

/**
 * Generates a strongly typed date string in the format 'year-month-day hours:minutes:seconds'.
 *
 * @returns {string} The generated date string.
 */
export function endDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(4, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Generates a strongly typed date string in the format 'day month year'.
 *
 * @returns {string} The generated date string.
 */
export function formatDate(): string {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const monthIndex = currentDate.getMonth();
  const month = [
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
  ][monthIndex];
  const year = currentDate.getFullYear().toString().padStart(4, "0");
  return `${day} ${month} ${year}`;
}

/**
 * Generates a strongly typed date string in the format 'day month year'.
 *
 * @returns {Promise<string>} A promise that resolves to a string representing the generated date.
 */
export async function formatDateLocal(): Promise<string> {
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.toLocaleString("id-ID", { month: "long" }),
    date.getFullYear(),
  ];
  return `${day.toString().padStart(2, "0")} ${month} ${year
    .toString()
    .padStart(4, "0")}`;
}

/**
 * Generates a strongly typed date string in the format 'day month year'.
 *
 * @returns {string} The generated date string.
 */
export function formatDatePlus(): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const day = tomorrow.getDate().toString().padStart(2, "0");
  const month = tomorrow.toLocaleString("default", { month: "long" });
  const year = tomorrow.getFullYear().toString().padStart(4, "0");

  return `${day} ${month} ${year}`;
}

/**
 * Generates a strongly typed date string in the format 'day month year'.
 *
 * @returns {string} The generated date string.
 */
export function formatDatePlusLocal(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "long" });
  const year = date.getFullYear().toString().padStart(4, "0");

  return `${day} ${month} ${year}`;
}

/**
 * Generates a strongly typed date string in the format 'year-month-day'.
 *
 * @param {number} index - The number of days to add to the current date.
 * @returns {string} The generated date string.
 */
export function dateCustome(index: number): string {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + index);
  const dateString = todayDate.toISOString().split("T")[0];
  return dateString;
}

/**
 * Parses a string representing a number in Indonesian currency format and returns the number as a number.
 *
 * @param {string} text - The string to parse.
 * @returns {number} The parsed number.
 */
export function getNumberFromRp(text: string): number {
  const valueString = text.match(/(\d+)(?:\.|,)(\d+)/);
  if (valueString) {
    const value = Number(`${valueString[1]}.${valueString[2]}`);
    return value;
  } else {
    throw new Error("Invalid currency format");
  }
}

/**
 * Parses a string representing a number and returns the number as a number.
 *
 * @param {string} text - The string to parse.
 * @returns {number} The parsed number.
 */
export function getNumberFromString(text: string): number {
  return Number(text.replace(/\D/g, ""));
}

/**
 * Parses a string representing a number of points and returns the number as a number.
 *
 * @param {string} text - The string to parse.
 * @returns {number} The parsed number of points.
 */
export function getPoinFromString(text: string): number {
  const startIndex: number = text.indexOf("n") + 1;
  const endIndex: number = text.length;
  const value: string = text.slice(startIndex, endIndex).replace(/\./g, "");
  return Number(value);
}

/**
 * Parses a string representing a stock of product and returns the stock as a string.
 *
 * @param {string} text - The string to parse.
 * @returns {string} The parsed stock of product as a string.
 */
export function getStockProduct(text: string): string {
  const value: number = +text.split(":")[1];
  return String(value);
}
