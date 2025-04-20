import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useController, useFormContext } from "react-hook-form";

import { forwardRef } from "react";

import { PasswordInputProps } from "./types";

export const PasswordInput = forwardRef(
    (
        {
            name,
            shouldUnregister = false,
            readOnly,
            ...props
        }: PasswordInputProps,
        ref
    ) => {
        const { control, formState } = useFormContext();

        const {
            field: { ref: fieldRef, ...fieldProps },
            fieldState: { error },
        } = useController({
            name,
            control,
            shouldUnregister,
            defaultValue: "",
        });

        const mergedRef = useMergedRef(ref, fieldRef);

        return (
            <MantinePasswordInput
                ref={mergedRef}
                error={error?.message}
                readOnly={formState.isSubmitting || readOnly}
                {...fieldProps}
                {...props}
            />
        );
    }
);
