export default async function getAttributes() {
  const attributes = await fetch("/attributes", {
    method: "get",
    headers: { "Content-Type": "application/json" }
  });
  const jsonResult = await attributes.json();
  return jsonResult;
}
