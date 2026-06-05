"use client";

import { type ReactNode } from "react";

type FieldProps = {
  defaultValue?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  type?: "text" | "url" | "email";
};

export function TextField({
  defaultValue,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: FieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function TextAreaField({
  defaultValue,
  label,
  name,
  placeholder,
  required,
  rows = 3,
}: FieldProps) {
  return (
    <label>
      <span>{label}</span>
      <textarea
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </label>
  );
}

export function FieldGroup({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <fieldset className="admin-fieldset">
      <legend>
        <span className="admin-fieldset-title">{title}</span>
        {description && (
          <span className="admin-fieldset-desc">{description}</span>
        )}
      </legend>
      <div className="admin-fieldset-body">{children}</div>
    </fieldset>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className="admin-form-row">{children}</div>;
}
