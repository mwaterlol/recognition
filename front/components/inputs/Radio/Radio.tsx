import { Radio as MantineRadio, RadioProps } from "@mantine/core";

import { useFormContext } from "react-hook-form";

import { RadioGroup } from "./RadioGroup";

export const Radio = (props: RadioProps) => {
    const { formState } = useFormContext();

    return (
        <MantineRadio
            {...props}
            readOnly={formState.isSubmitting || props.readOnly}
        />
    );
};

Radio.Group = RadioGroup;
