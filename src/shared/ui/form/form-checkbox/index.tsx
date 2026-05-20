import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

export type FormCheckboxProps = CheckboxProps & {
  name: string
  label: string
}

export const FormCheckbox = ({ name, label, ...props }: FormCheckboxProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
                {...field}
                {...props}
              />
            }
            label={label}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default FormCheckbox
