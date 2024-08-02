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
    <Box sx={{ my: 1 }}>
      <Typography fontSize={18}>
        Applied filters:{nonEmptyFiltersCount <= 0 && ' none.'}
      </Typography>
      {nonEmptyFiltersCount > 0 && (
        <Stack
          direction={'row'}
          gap={1}
          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
        >
          {filters.map(
            (filter) =>
              filter.values.length > 0 && (
                <Stack
                  key={filter}
                  spacing={1}
                  direction={'row'}
                  sx={{ mt: 1, mb: 1, flexWrap: 'wrap' }}
                >
                  <Typography>{filter.label}:</Typography>
                  {filter.values.slice(0, 3).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      variant="outlined"
                      sx={{ my: 1 }}
                      onDelete={() => {
                        setQueryParams({
                          [filter.label]: filter.values.filter(
                            (v) => v !== value,
                          ),
                        });
                      }}
                    />
                  ))}
                  {filter.values.length > 3 && <Typography>...</Typography>}
                </Stack>
              ),
          )}
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={onClearAllFilters}
            sx={{
              float: 'right',
              textWrap: 'nowrap',
              textTransform: 'none',
              ml: 'auto',
            }}
          >
            Clear all
          </Button>
        </Stack>
      )}
    </Box>
  );
}
