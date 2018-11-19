const techstacks = [
  "C",
  "C++",
  "Go",
  "GraphQL",
  "Java",
  "Javascript",
  "jQuery",
  "Mongoose",
  "Nodejs",
  "NoSQL",
  "Perl",
  "PHP",
  "Python",
  "PostgreSQL",
  "Rails",
  "React",
  "Ruby",
  "SQL",
  "Swift"
];

export const getTechstack = () => {
  return techstacks;
};

export const getFilteredTechstack = projects => {
  let techstack = [];
  techstack = projects.flatMap(item => {
    console.log("Item:", item["techstack"]);
    return item["techstack"];
  });

  let uniqueTechstack = [...new Set(techstack)];
  uniqueTechstack.sort();
  return uniqueTechstack;
};
