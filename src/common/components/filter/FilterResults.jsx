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
  const nonEmptyFiltersCount = filters.reduce((count, f) => {
    if (f.values.length > 0) return count + 1;
    else return count;
  }, 0);
  return (
    <Box>
      <Typography fontSize={18}>
        Applied filters:{nonEmptyFiltersCount <= 0 && ' none.'}
      </Typography>
      {nonEmptyFiltersCount > 0 && (
        <Stack direction={'row'}>
          {filters.map(
            (filter) =>
              filter.values.length > 0 && (
                <Stack
                  key={filter}
                  spacing={1}
                  direction={'row'}
                  sx={{ mt: 1, mb: 1 }}
                  width={'100vw'}
                >
                  <Typography>{filter.label}:</Typography>
                  {filter.values.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      variant="outlined"
                      onDelete={() => {
                        setQueryParams({
                          [filter.label]: filter.values.filter(
                            (v) => v !== value,
                          ),
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
            sx={{ float: 'right', textWrap: 'nowrap', pl: 4, pr: 4 }}
          >
            Clear all
          </Button>
        </Stack>
      )}
    </Box>
  );
}
