import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import { Autocomplete, Checkbox, TextField } from '@mui/material';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultRenderOption = (props, option, { selected }) => {
  const { key, ...optionProps } = props;

  return (
    <li key={key} {...optionProps}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        sx={{ marginRight: 8 }}
        checked={selected}
      />
      {option}
    </li>
  );
};

export default function MultiSelect({
  label,
  placeholder,
  renderOption,
  ...autocompleteProps
}) {
  return (
    <Autocomplete
      multiple
      {...autocompleteProps}
      disableCloseOnSelect
      renderOption={renderOption || defaultRenderOption}
      renderInput={params => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
