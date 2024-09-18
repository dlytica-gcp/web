export function convertDateToMonth(date) {
  const extractDate = new Date(date);
  const month = extractDate.toLocaleString("default", { month: "long" });
  //   if needed day as well
  //   const day = extractDate.toLocaleString("default", { day: "numeric" });
  return `${month}`;
}

export function convertDateToYMD(date) {
  if(!date){
    return "-";
  }
  const extractDate = new Date(date);
  const year = extractDate.getFullYear();
  const month = String(extractDate.getMonth() + 1).padStart(2, "0");
  const day = String(extractDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
