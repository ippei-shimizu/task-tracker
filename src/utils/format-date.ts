export function formatDateToYYYYMMDD(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const utcOffsetMs = 9 * 60 * 60 * 1000;
  const japanTime = new Date(dateObj.getTime() + utcOffsetMs);

  const year = japanTime.getFullYear();
  const month = String(japanTime.getMonth() + 1).padStart(2, "0");
  const day = String(japanTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
