import { CheckBox as CheckBoxIcon } from "@mui/icons-material";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
//import { useSearchParams } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Select({
  options,
  label,
  placeholder,
  filter,
  defaultFilter,
}) {
  const [searchParams, setSearchParams] = useQueryParams(defaultFilter);

  //   console.log(searchParams);
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
              checked={selected}
              onChange={(e, checked) => {
                if (checked) {
                  setSearchParams({
                    [filter]: [...searchParams[filter], option],
                  });
                } else {
                  setSearchParams({
                    [filter]: searchParams[filter].filter((o) => o !== option),
                  });
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
