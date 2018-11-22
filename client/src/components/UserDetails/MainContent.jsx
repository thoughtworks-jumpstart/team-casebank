import React from "react";
import { Link } from "react-router-dom";

export default function MainContent({
  user: { name, role, projects, techstack }
}) {
  return (
    <div className="pl-5">
      <h3>{name}</h3>
      <h4>{role}</h4>
      <br />
      {techstack.length > 0 ? (
        <div>
          <h4>Tech Stack</h4>
          <h5>{techstack.join(", ")}</h5>
        </div>
      ) : null}
      <br />
      <h4>Projects</h4>
      {projects.map((project, index) => (
        <div key={index}>
          <Link to={`/results/details/${project._id}`} target="_blank">
            {project.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
