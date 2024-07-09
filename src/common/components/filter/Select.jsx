import { CheckBox as CheckBoxIcon } from "@mui/icons-material";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
//import { useEffect } from "react";
//import { useState } from "react";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Select({
  options,
  label,
  placeholder,
  onSelect,
  selectedOptions
}) {
  //const [selectedOptions, setSelectedOptions] = useState([]);
  // useEffect(()=>{
  //   onSelect(filter, selectedOptions);
  // }, [selectedOptions, filter, onSelect]);
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              //defaultChecked={selectedOptions.includes(option)}
              checked={selected}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelect([...selectedOptions, option]);
                } else {
                  onSelect(selectedOptions.filter(o => o !== option));
                }
              }}
            />
            {option}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
