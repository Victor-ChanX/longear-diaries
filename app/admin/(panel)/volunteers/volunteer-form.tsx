"use client";

import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { addVolunteerAction, type AddVolunteerState } from "./actions";

const initialState: AddVolunteerState = {};

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(
    addVolunteerAction,
    initialState,
  );
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form action={formAction} className="admin-form">
      <div className="admin-form-row">
        <label>
          <span>Name</span>
          <input name="name" required type="text" />
        </label>
        <label>
          <span>Avatar (JPG / PNG / WebP, ≤ 4 MB)</span>
          <input
            accept="image/jpeg,image/png,image/webp,image/gif"
            name="avatar"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (preview) URL.revokeObjectURL(preview);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            required
            type="file"
          />
        </label>
      </div>

      {preview && (
        <div className="admin-avatar-preview">
          <img alt="Avatar preview" src={preview} />
          <span className="admin-muted">Preview</span>
        </div>
      )}

      <label>
        <span>Bio</span>
        <textarea
          name="bio"
          placeholder="A short personal introduction…"
          required
          rows={4}
        />
      </label>

      {state.error && <p className="admin-form-error">{state.error}</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </form>
  );
}
