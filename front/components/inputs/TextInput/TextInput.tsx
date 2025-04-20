import { TextInput as MantineTextInput } from '@mantine/core'
import { useMergedRef } from '@mantine/hooks'
import { useController, useFormContext } from 'react-hook-form'

import { forwardRef } from 'react'

import { TextInputProps } from './types'

export const TextInput = forwardRef(
  (
    { name, shouldUnregister = false, readOnly, ...props }: TextInputProps,
    ref
  ) => {
    const { control, formState } = useFormContext()

    const {
      field: { ref: fieldRef, ...fieldProps },
      fieldState: { error },
    } = useController({ name, control, shouldUnregister, defaultValue: '' })

    const mergedRef = useMergedRef(ref, fieldRef)

    return (
      <MantineTextInput
        ref={mergedRef}
        error={error?.message}
        readOnly={formState.isSubmitting || readOnly}
        {...fieldProps}
        {...props}
      />
    )
  }
)
