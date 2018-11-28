import React from "react";
import CreatableSelect from "react-select/lib/Creatable";

export default function Title({
  clients,
  selected,
  createOption,
  onChange,
  submit,
  name,
  saveName
}) {
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
        onCreateOption={option => createOption(option, clients.attribute)}
      />
      <input
        className="form-control mt-2"
        type="text"
        value={name}
        placeholder="Title of Project"
        onChange={saveName}
      />
      <button onClick={e => submit()}>Submit</button>
    </div>
  );
}
