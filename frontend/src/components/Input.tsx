import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
    name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
    const inputId = id ?? name;

    return (
        <div className="relative">
            <input
                name={name}
                id={inputId}
                {...props}
                className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 placeholder-shown:pt-0 peer focus:border-gray-800 outline-none"
                placeholder=""
            />

            <label
                htmlFor={inputId}
                className="absolute text-xs pointer-events-none left-[14px] top-2 text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
            >
                {placeholder}
            </label>
        </div>
    );
}
