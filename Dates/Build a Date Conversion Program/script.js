const currentDate = new Date();

let currentDateFormat = `Current Date and Time: ${currentDate}`; 

console.log(currentDateFormat);

function formatDateMMDDYYYY(date){
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate()).padStart(2,"0");
  const year = date.getFullYear();

  return `Formatted Date (MM/DD/YYYY): ${month}/${day}/${year}`

}

console.log(formatDateMMDDYYYY(currentDate));

function formatDateLong(date) {
  const longDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return `Formatted Date (Month Day, Year): ${longDate}`
}

console.log(formatDateLong(currentDate));