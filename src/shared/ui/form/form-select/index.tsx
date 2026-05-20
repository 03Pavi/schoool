import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'

export interface SelectOption {
  value: string | number
  label: string
}

export type FormSelectProps = SelectProps & {
  name: string
  label: string
  options: SelectOption[]
}

export const FormSelect = ({ name, label, options, ...props }: FormSelectProps) => {
  const { control } = useFormContext()
  const labelId = `${name}-label`

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select labelId={labelId} label={label} {...field} {...props}>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default FormSelect
