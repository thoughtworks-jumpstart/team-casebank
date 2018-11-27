export default async function getAttributes() {
  try {
    const attributes = await fetch("/attributes", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });
    const jsonResult = await attributes.text();
    const jsonObject = JSON.parse(jsonResult);
    return jsonObject;
  } catch (err) {
    console.log(err);
  }
}

export function getYears() {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1999; i <= currentYear; i++) {
    years.push(i.toString());
  }
  let Year = { attribute: "Year", list: years };
  return Year;
}
