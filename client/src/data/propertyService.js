export const getFilteredProperties = (projects, property) => {
  let properties = [];
  properties = projects.map(item => {
    return item[property];
  });
  let uniqueProperties = [...new Set(properties)];
  uniqueProperties.sort();
  return uniqueProperties;
};

export const getFilteredMultiProperties = (projects, property) => {
  let properties = [];
  properties = projects.flatMap(item => {
    console.log("Item:", item[property]);
    return item[property];
  });

  let uniqueProperties = [...new Set(properties)];
  uniqueProperties.sort();
  return uniqueProperties;
};
