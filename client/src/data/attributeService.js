export async function getAttributes() {
  try {
    const attributes = await fetch("/attributes", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });
    const jsonResult = await attributes.json();
    return jsonResult;
  } catch (err) {
    console.log(err);
  }
}

export function getYears() {
  const years = [];
  const currentYear = new Date().getFullYear() + 2;
  for (let i = 1990; i <= currentYear; i++) {
    years.unshift(i.toString());
  }
  let Year = { attribute: "Year", list: years };
  return Year;
}

export async function create(option, attribute) {
  const res = await fetch("/attributes/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attribute, option })
  });
  const jsonResult = await res.json();
  return jsonResult;
}

