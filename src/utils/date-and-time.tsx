export function TransformDateToHHMMSS(date: Date) {
  return date.toLocaleTimeString("pt-BR");
}

export function TransformDateToDDHHMMSSOnly(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return "00 | 00:00:00";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedDays}|${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formateToDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}
