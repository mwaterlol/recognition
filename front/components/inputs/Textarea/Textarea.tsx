import { Textarea as MantineTextarea } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useController, useFormContext } from "react-hook-form";

import { forwardRef } from "react";

import { TextareaProps } from "./types";

export const Textarea = forwardRef(
    (
        { name, shouldUnregister = false, readOnly, ...props }: TextareaProps,
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
            <MantineTextarea
                ref={mergedRef}
                error={error?.message}
                readOnly={formState.isSubmitting || readOnly}
                {...fieldProps}
                {...props}
            />
        );
    }
);
