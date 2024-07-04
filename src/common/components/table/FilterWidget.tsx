import {
  Chip,
  Container,
  Button,
  Autocomplete,
  TextField,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { useState } from "react";

type Props = {
  filters: Record<string, string>;
  setFilters: (
    newState:
      | Record<string, string>
      | ((prevState: Record<string, string>) => Record<string, string>)
  ) => void;
  filterOptions: string[];
};

export function FilterWidget(props: Props) {
  const { filters, setFilters, filterOptions } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const handleOptionChange = (
    event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    const lastValue = newValue[newValue.length - 1];
    if (lastValue && !lastValue.includes(":")) {
      setInputValue(lastValue + ": ");
      setSelectedOptions(newValue.slice(0, -1));
    } else {
      setSelectedOptions(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.includes(":")) {
      const [key, value] = inputValue.split(":").map((str) => str.trim());
      if (key && value) {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setSelectedOptions((prev) => [...prev, `${key}: ${value}`]);
        setInputValue("");
      }
    }
  };

  const handleDeleteChip = (chipToDelete: string) => () => {
    const [key] = chipToDelete.split(":").map((str) => str.trim());
    setSelectedOptions((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
    setFilters((filters) => {
      const newFilters = { ...filters };
      delete newFilters[key];
      return newFilters;
    });
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
    setFilters({} as Record<string, string>);
  };

  return (
    <Container>
      <Autocomplete
        multiple
        freeSolo
        options={filterOptions.map((option) => option + ": ")}
        inputValue={inputValue}
        value={selectedOptions}
        onInputChange={handleInputChange}
        onChange={handleOptionChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              onDelete={handleDeleteChip(option)}
            />
          ))
        }
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField {...params} label="Filter" onKeyDown={handleKeyDown} />
        )}
      />
      <Button onClick={handleClearAll} variant="contained">
        Clear All
      </Button>
    </Container>
  );
}
