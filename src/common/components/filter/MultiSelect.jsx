import { CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { CheckBoxOutlineBlank } from '@mui/icons-material';
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
  onSelect,
  renderOption,
  selectedOptions,
  ...autocompleteProps
}) {
  return (
    <Autocomplete
      sx={{ mt: 1, mb: 1, minWidth: '300px' }}
      defaultValue={selectedOptions}
      multiple
      {...autocompleteProps}
      disableCloseOnSelect
      onChange={(e, newVal) => onSelect(newVal)}
      getOptionLabel={(option) => option}
      renderTags={() => null}
      renderOption={renderOption || defaultRenderOption}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
