import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

export default function SearchInput({ searchTerm, setSearchTerm, ...props }) {
  return (
    <TextField
      variant="outlined"
      value={searchTerm}
      onChange={e => {
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
            <IconButton
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
