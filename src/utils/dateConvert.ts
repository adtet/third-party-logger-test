import { format } from "date-fns";

function convertOrdinalToDatetime(data: any): string {
  const originalDateTimeString: string = "2023-08-02T11:41:43.000Z";

  // Parse the original datetime string to a Date object
  const originalDate: Date = new Date(originalDateTimeString);

  // Convert the date to the desired format
  const formattedDate: string = originalDate.toLocaleString("en-Gb", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "UTC", // Use UTC timezone (since the input string has a 'Z' at the end)
  });

  return formattedDate;
}

function formatDateTime(dateTimeString: string): string {
  const dateTime: Date = new Date(dateTimeString);

  const year: number = dateTime.getUTCFullYear();
  const month: string = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
  const day: string = String(dateTime.getUTCDate()).padStart(2, "0");
  const hours: string = String(dateTime.getUTCHours() + 7).padStart(2, "0"); // Adding 7 hours for your timezone
  const minutes: string = String(dateTime.getUTCMinutes()).padStart(2, "0");
  const seconds: string = String(dateTime.getUTCSeconds()).padStart(2, "0");

  const formattedDateTime: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

function formatDate(dateTimeString: string): string {
  const originalDate: Date = new Date(dateTimeString);
  const newDate: Date = new Date(originalDate.getTime() + 2.52e7 + 1000);

  const year: number = newDate.getUTCFullYear();
  const month: string = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const day: string = String(newDate.getUTCDate()).padStart(2, "0");

  const formattedDate: string = `${year}-${month}-${day}`;

  return formattedDate;
}

export { convertOrdinalToDatetime, formatDateTime, formatDate };
