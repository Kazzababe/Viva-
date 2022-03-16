import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react";
import { useField, UseFieldConfig } from "react-final-form";

export interface LabeledCheckboxProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
    /** Field name. */
    name: string;
    /** Field label. */
    label: string;
    /** Field type. Doesn't include radio buttons and checkboxes */
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
    labelProps?: ComponentPropsWithoutRef<"label">;
    fieldProps?: UseFieldConfig<string>;
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(
    ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name, {
            parse: (v) => v,
            ...fieldProps,
            type: "checkbox",
        });

        const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError;

        return (
            <div {...outerProps} className="mb-6">
                <label {...labelProps} className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                    <input {...input} disabled={submitting} {...props} ref={ref} type="checkbox" />
                </label>

                {touched && normalizedError && (
                    <div role="alert" className="text-red-500 text-xs italic">
                        {normalizedError}
                    </div>
                )}
            </div>
        );
    }
);

export default LabeledCheckbox;
