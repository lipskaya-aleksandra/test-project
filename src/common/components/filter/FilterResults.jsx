import { Delete } from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import useQueryParams from '../../hooks/useQueryParams';

export default function FilterResults({ defaultFilters }) {
  const { queryParams, setQueryParams } = useQueryParams(defaultFilters);
  const filters = Object.entries(queryParams).map(([key, value]) => ({
    label: key,
    values: Array.isArray(value) ? [...value] : [value],
  }));
  const onClearAllFilters = () => {
    setQueryParams(defaultFilters);
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
                    setQueryParams({
                      [filter.label]: filter.values.filter((v) => v !== value),
                    });
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
