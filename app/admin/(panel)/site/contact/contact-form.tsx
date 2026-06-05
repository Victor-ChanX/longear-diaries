"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { ContactContent } from "@/lib/data/site-defaults";

import { FieldGroup, FormRow, TextAreaField, TextField } from "../form-fields";
import { saveContactAction, type SectionState } from "./actions";

const initial: SectionState = {};

const ICON_BY_INDEX = ["Heart", "Camera", "AtSign"] as const;

export function ContactForm({ content }: { content: ContactContent }) {
  const [state, action, pending] = useActionState(saveContactAction, initial);

  return (
    <form action={action} className="admin-form">
      <FieldGroup title="Hero">
        <TextField
          defaultValue={content.hero.eyebrow}
          label="Eyebrow"
          name="hero.eyebrow"
        />
        <TextField
          defaultValue={content.hero.title}
          label="Title"
          name="hero.title"
        />
        <TextAreaField
          defaultValue={content.hero.subtitle}
          label="Subtitle"
          name="hero.subtitle"
          rows={3}
        />
      </FieldGroup>

      <FieldGroup
        description="Three contact channels in order: RedNote slot, Instagram slot, Email slot. Icons are fixed."
        title="Channels"
      >
        {[0, 1, 2].map((i) => (
          <div className="admin-form-sub" key={i}>
            <p className="admin-form-sub-title">
              Channel {i + 1} · icon: {ICON_BY_INDEX[i]}
            </p>
            <FormRow>
              <TextField
                defaultValue={content.channels[i]?.label ?? ""}
                label="Label"
                name={`channels.${i}.label`}
                placeholder="RedNote / Instagram / Email"
              />
              <TextField
                defaultValue={content.channels[i]?.handle ?? ""}
                label="Handle (shown in serif)"
                name={`channels.${i}.handle`}
                placeholder="@yourhandle"
              />
            </FormRow>
            <TextField
              defaultValue={content.channels[i]?.href ?? ""}
              label="Link URL (full https:// or mailto:)"
              name={`channels.${i}.href`}
              placeholder="https://… or mailto:…"
              type="url"
            />
            <TextAreaField
              defaultValue={content.channels[i]?.description ?? ""}
              label="Description"
              name={`channels.${i}.description`}
              rows={3}
            />
          </div>
        ))}
      </FieldGroup>

      {state.error && <p className="admin-form-error">{state.error}</p>}
      {state.ok && <p className="admin-form-success">Saved.</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : "Save contact page"}
        </Button>
      </div>
    </form>
  );
}
