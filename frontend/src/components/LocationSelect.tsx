import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select"; // 导入 SelectChangeEvent
import MenuItem from "@mui/material/MenuItem";

interface LocationSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void; // 使用 SelectChangeEvent 类型
}

export default function LocationSelect({ value, onChange }: LocationSelectProps) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="location-label">Location</InputLabel>
      <Select
        labelId="location-label"
        id="location"
        value={value}
        onChange={onChange}
        label="Location"
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