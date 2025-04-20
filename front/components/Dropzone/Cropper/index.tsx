import { forwardRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { Image } from "@mantine/core";
import "react-image-crop/dist/ReactCrop.css";
import { FileWithPath } from "@mantine/dropzone";

const Cropper = forwardRef(({ file }: { file: FileWithPath }, ref) => {
    const [crop, setCrop] = useState<Crop>();
    return (
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <Image
                src={URL.createObjectURL(file)}
                mah="80vh"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                style={{
                    borderRadius: "var(--mantine-spacing-md)",
                    objectFit: "contain",
                }}
            />
        </ReactCrop>
    );
});

export default Cropper;
