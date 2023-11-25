import { InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

const CustomInput = ({
  name,
  label,
  type,
  control,
  textFieldProps,
  error,
  helperText,
  rules,
  minLength,
  onFocus,
  icon,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          sx={{ backgroundColor: "white", borderRadius: "3px", color:'black', '.MuiInputBase-root':{color: "black"} }}
          label={label}
          error={error}
          type={type}
          helperText={helperText}
          variant="outlined"
          fullWidth
          {...field}
          {...textFieldProps}
          onFocus={onFocus}
          minLength={minLength}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          placeholder={placeholder}
        />
      )}
      rules={rules || { required: true }}
    />
  )
}
export default CustomInput
