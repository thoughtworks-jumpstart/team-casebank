const status = [
  "Cancelled",
  "Completed",
  "Ongoing",
  "Planning"

  // "Cancelled",
  // "Closed",
  // "Completed",
  // "Discovery",
  // "Live",
  // "Planning"
];

export const getStatus = () => {
  return status;
};

export const getFilteredStatus = projects => {
  let status = [];
  status = projects.map(item => {
    return item["status"];
  });
  let uniqueStatus = [...new Set(status)];
  uniqueStatus.sort();
  return uniqueStatus;
};
