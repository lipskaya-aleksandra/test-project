import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

export default function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      sx={{ mt: 1, mb: 1 }}
      size="small"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={() => {
              setSearchTerm('');
            }}
          >
            <IconButton>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
