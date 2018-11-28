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
    <div className="w-100">
      <div className="pl-5 w-50 float-left">
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
      </div>
      <div className="pr-5 pt-5">
        <button className="btn btn-secondary float-right" onClick={e => submit()}>
          Submit
        </button>
      </div>
    </div>
  );
}
