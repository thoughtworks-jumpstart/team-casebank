async function getBackEndData() {
  try {
    const message = await fetch("/api/test", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const jsonResult = await message.json();
    console.log(jsonResult);
    return jsonResult;
  } catch (error) {}
}

export { getBackEndData };
