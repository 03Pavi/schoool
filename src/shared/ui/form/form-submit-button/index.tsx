import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AppButton, AppButtonProps } from '../../app-button'

export type FormSubmitButtonProps = AppButtonProps

export const FormSubmitButton = ({ children, ...props }: FormSubmitButtonProps) => {
  const { formState: { isSubmitting } } = useFormContext()

  return (
    <AppButton
      type="submit"
      variant="contained"
      color="primary"
      loading={isSubmitting}
      {...props}
    >
      {children}
    </AppButton>
  )
}

export default FormSubmitButton
