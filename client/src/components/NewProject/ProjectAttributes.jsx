import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
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
  console.log(selected);
  return formattedAttributes ? (
    <div>
      {formattedAttributes.map(a => {
        return (
          <div className="mb-3" key={a.attribute}>
            <h6>
              <div className="dropdown-label">
                {a.attribute === "nda" ? "NDA" : a.attribute}
              </div>
            </h6>
            <CreatableSelect
              id={a.attribute}
              value={selected[a.attribute]}
              isMulti={
                a.attribute === "Techstack" || a.attribute === "Team"
                  ? true
                  : false
              }
              isClearable={true}
              name={a.attribute}
              options={a.list.map(name => {
                return { value: name, label: name };
              })}
              onChange={selectedOptions =>
                onChange(selectedOptions, a.attribute)
              }
              isDisabled={a.attribute === "Office" && !region ? true : false}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="All"
              openMenuOnClick={false}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
              }}
              onCreateOption={createOption}
            />
          </div>
        );
      })}
    </div>
  ) : null;
}
