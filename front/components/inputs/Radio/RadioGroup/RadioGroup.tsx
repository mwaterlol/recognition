import { Radio } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useController, useFormContext } from "react-hook-form";

import { forwardRef } from "react";

import { RadioGroupProps } from "./types";

export const RadioGroup = forwardRef(
    ({ name, shouldUnregister = false, ...props }: RadioGroupProps, ref) => {
        const { control } = useFormContext();

        const {
            field: { ref: fieldRef, ...fieldProps },
            fieldState: { error },
        } = useController({ name, control, shouldUnregister });

        const mergedRef = useMergedRef(ref, fieldRef);

        return (
            <Radio.Group
                ref={mergedRef}
                error={error?.message}
                {...fieldProps}
                {...props}
            />
        );
    }
);
