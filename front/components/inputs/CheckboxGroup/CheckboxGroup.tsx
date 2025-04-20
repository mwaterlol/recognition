import { forwardRef } from "react";
import { Checkbox as MantineCheckbox, Stack } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useController, useFormContext } from "react-hook-form";

import { CheckboxGroupProps } from "./types";

export const CheckboxGroup = forwardRef(
    (
        {
            name,
            shouldUnregister = false,
            children,
            ...props
        }: CheckboxGroupProps,
        ref
    ) => {
        const { control } = useFormContext();

        const {
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState: { error },
        } = useController({ name, control, shouldUnregister });

        const mergedRef = useMergedRef(ref, fieldRef);

        return (
            <MantineCheckbox.Group
                ref={mergedRef}
                defaultValue={value.length ? value : []}
                error={error?.message}
                {...fieldProps}
                {...props}
            >
                <Stack
                    mt="xs"
                    gap="xs"
                    style={(theme) => ({
                        "&:not(:last-child)": {
                            marginBottom: theme.spacing.sm,
                        },
                    })}
                >
                    {children}
                </Stack>
            </MantineCheckbox.Group>
        );
    }
);
