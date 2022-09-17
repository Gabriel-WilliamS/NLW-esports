import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputTime(props: InputProps) {
  return (
    <input
      {...props}
      className="bg-zinc-900 py-3 px-2 rounded text-sm placeholder:text-zinc-500"
    />
  );
}
