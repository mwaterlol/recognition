import { Checkbox as MantineCheckbox } from '@mantine/core'
import { useMergedRef } from '@mantine/hooks'
import { useController, useFormContext } from 'react-hook-form'

import { forwardRef } from 'react'

import { CheckboxProps } from './types'

export const Checkbox = forwardRef(
  (
    { name, shouldUnregister = false, readOnly, ...props }: CheckboxProps,
    ref
  ) => {
    const { control, formState } = useFormContext()

    const {
      field: { ref: fieldRef, value: checked, ...fieldProps },
      fieldState: { error },
    } = useController({ name, control, shouldUnregister })

    const mergedRef = useMergedRef(ref, fieldRef)

    return (
      <MantineCheckbox
        ref={mergedRef}
        checked={checked ? checked : false}
        error={error?.message}
        readOnly={formState.isSubmitting || readOnly}
        {...fieldProps}
        {...props}
      />
    )
  }
)
