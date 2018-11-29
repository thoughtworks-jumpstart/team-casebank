import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import Select from "react-select";
import { getYears } from "../../data/attributeService";

export default function ProjectAttributes({
  attributes,
  selected,
  createOption,
  onChange,
  region
}) {
  let filteredRegions = region ? region.value : null;
  let formattedAttributes = attributes
    .filter(a => a.attribute !== "Client")
    .map(a => {
      if (a.attribute === "Office") {
        return {
          ...a,
          list: a.list.reduce((allOffices, regionalOffices) => {
            if (!region) {
              return allOffices.concat(Object.values(regionalOffices)[0]);
            } else if (filteredRegions === Object.keys(regionalOffices)[0]) {
              return allOffices.concat(Object.values(regionalOffices)[0]);
            } else return allOffices;
          }, [])
        };
      }
      return a;
    });
  formattedAttributes.unshift(getYears());
  let order = [
    "Region",
    "Office",
    "Year",
    "NDA Status",
    "Industry",
    "Techstack",
    "Main TW Contact",
    "Team"
  ];
  let reOrderedA = [];
  for (let i = 0; i < order.length; i++) {
    let toAdd = formattedAttributes.filter(a => a.attribute === order[i])[0];
    reOrderedA.push(toAdd);
  }
  return attributes ? (
    <div>
      {reOrderedA.map(a => {
        return (
          <div className="mb-3" key={a.attribute}>
            <h6>
              <div className="dropdown-label">{a.attribute}</div>
            </h6>
            {a.attribute === "Techstack" ? (
              <CreatableSelect
                id={a.attribute}
                value={selected[a.attribute]}
                isMulti={true}
                isClearable={true}
                name={a.attribute}
                options={a.list.map(name => {
                  return { value: name, label: name };
                })}
                onChange={selectedOptions =>
                  onChange(selectedOptions, a.attribute)
                }
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select"
                onCreateOption={option => createOption(option, a.attribute)}
              />
            ) : (
              <Select
                id={a.attribute}
                value={selected[a.attribute]}
                isMulti={a.attribute === "Team" ? true : false}
                isClearable={true}
                name={a.attribute}
                options={
                  a.attribute === "Team" || a.attribute === "Main TW Contact"
                    ? a.list
                    : a.list.map(name => {
                        return { value: name, label: name };
                      })
                }
                onChange={selectedOptions =>
                  onChange(selectedOptions, a.attribute)
                }
                isDisabled={a.attribute === "Office" && !region ? true : false}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder={
                  a.attribute === "Team" || a.attribute === "Main TW Contact"
                    ? "Enter name"
                    : "Select"
                }
                openMenuOnClick={false}
                components={
                  a.attribute === "Main TW Contact" || a.attribute === "Team"
                    ? {
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }
                    : null
                }
              />
            )}
          </div>
        );
      })}
    </div>
  ) : null;
}
