import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export type FormInputProps = TextFieldProps & {
  name: string
}

export const FormInput = ({ name, ...props }: FormInputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error ? error.message : props.helperText}
        />
      )}
    />
  )
}

export default FormInput
