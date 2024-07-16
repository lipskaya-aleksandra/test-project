import { Delete } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
//import { useSearchParams } from "react-router-dom";
import useQueryParams from '../../hooks/useQueryParams';

export default function FilterResults({ defaultFilters }) {
  const [searchParams, setSearchParams] = useQueryParams(defaultFilters);
  const filters = Object.entries(searchParams).map(([key, value]) => ({
    label: key,
    values: Array.isArray(value) ? [...value] : [value],
  }));
  const onClearAllFilters = () => {
    setSearchParams(defaultFilters);
  };
  return (
    <Box>
      <Typography>Applied filters:</Typography>

      {filters.map(
        (filter) =>
          filter.values.length > 0 && (
            <Stack key={filter} spacing={1} direction={'row'}>
              <Typography>{filter.label}</Typography>
              {filter.values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  variant="outlined"
                  onDelete={() => {
                    setSearchParams({
                      [filter.label]: filter.values.filter((v) => v !== value),
                    });
                    // let newParams = { ...searchParams };
                    // if (filter.values.length === 1) {
                    //   delete newParams[filter.label];
                    //   setSearchParams(newParams);
                    // } else {
                    //   const index = filter.values.indexOf(value);
                    //   if (index > -1) {
                    //     filter.values.splice(index, 1);
                    //   }
                    //   newParams[filter] = filter.values;
                    //   setSearchParams();
                    // }
                  }}
                />
              ))}
            </Stack>
          ),
      )}

      <Button
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={onClearAllFilters}
      >
        Clear all
      </Button>
    </Box>
  );
}
