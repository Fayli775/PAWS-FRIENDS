import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface LocationSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function LocationSelect({
  value,
  onChange,
}: LocationSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel
        id="location-label"
        sx={{
          top: "23%",
          display: "flex",
          alignItems: "center",
        }}
      >
        Location <Typography component="span"> *</Typography>
      </InputLabel>
      <Select
        labelId="location-label"
        id="location"
        value={value}
        onChange={onChange}
        label="Location"
        sx={{ mt: 2 }}
      >
        <MenuItem value="CBD">CBD</MenuItem>
        <MenuItem value="Central Auckland">Central Auckland</MenuItem>
        <MenuItem value="East Auckland">East Auckland</MenuItem>
        <MenuItem value="West Auckland">West Auckland</MenuItem>
        <MenuItem value="South Auckland">South Auckland</MenuItem>
        <MenuItem value="North Shore">North Shore</MenuItem>
      </Select>
    </FormControl>
  );
}