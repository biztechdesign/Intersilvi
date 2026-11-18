"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Field, IconButton, TextInput, describedBy } from "@/design-system";

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  id: string;
  label: string;
  error?: string;
  help?: ReactNode;
  /** Shown directly under the field, e.g. a "Forgot password?" link. */
  below?: ReactNode;
}

/** Password input with a show/hide control inside the field. The input keeps right padding so text never runs under the icon. */
export function PasswordField({ id, label, error, help, below, ...input }: PasswordFieldProps) {
  const [shown, setShown] = useState(false);
  return (
    <div className="grid gap-2">
      <Field id={id} label={label} error={error} help={help}>
        <span className="relative block">
          <TextInput
            id={id}
            type={shown ? "text" : "password"}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy(id, { error, help })}
            className="pr-12"
            autoCapitalize="none"
            spellCheck={false}
            {...input}
          />
          <IconButton
            icon={shown ? "eye-off" : "eye"}
            label={shown ? "Hide password" : "Show password"}
            aria-pressed={shown}
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
            onClick={() => setShown((s) => !s)}
          />
        </span>
      </Field>
      {below}
    </div>
  );
}
