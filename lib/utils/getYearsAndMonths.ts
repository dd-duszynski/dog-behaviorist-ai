export function getYearsAndMonths(startDate: Date, endDate = new Date()) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} lat, ${months} miesięcy`;
}
