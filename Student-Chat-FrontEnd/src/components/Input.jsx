import { TextField, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  name,
  half,
  handleChange,
  label,
  type,
  autoFocus,
  handleShowPassword,
  value,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        value={value}
        required
        fullWidth
        variant="outlined"
        label={label}
        type={type}
        autoFocus={autoFocus}
        autoComplete="false"
        inputProps={
          name === "password" && {
            maxLength: 255,
            minLength: 8,
          }
        }
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
