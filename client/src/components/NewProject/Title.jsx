import React from "react";
import CreatableSelect from "react-select/lib/Creatable";

export default function Title({ clients, selected, createOption, onChange }) {
  return (
    <div className="pl-5 w-50">
      <CreatableSelect
        id={clients.attribute}
        value={selected}
        isMulti={false}
        isClearable={true}
        name={clients.attribute}
        options={clients.list.map(name => {
          return { value: name, label: name };
        })}
        onChange={selectedOptions =>
          onChange(selectedOptions, clients.attribute)
        }
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Client Name"
        openMenuOnClick={false}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null
        }}
        onCreateOption={createOption}
      />
      <input
        className="form-control mt-2"
        type="text"
        placeholder="Title of Project"
      />
    </div>
  );
}
