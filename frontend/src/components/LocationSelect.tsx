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
        <MenuItem value="cbd">CBD</MenuItem>
        <MenuItem value="central-auckland">Central Auckland</MenuItem>
        <MenuItem value="east-auckland">East Auckland</MenuItem>
        <MenuItem value="west-auckland">West Auckland</MenuItem>
        <MenuItem value="south-auckland">South Auckland</MenuItem>
        <MenuItem value="north-shore">North Shore</MenuItem>
      </Select>
    </FormControl>
  );
}