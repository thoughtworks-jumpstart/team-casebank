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
