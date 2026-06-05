"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { EventsContent } from "@/lib/data/site-defaults";

import { FieldGroup, FormRow, TextAreaField, TextField } from "../form-fields";
import { saveEventsAction, type SectionState } from "./actions";

const initial: SectionState = {};

const ICON_BY_INDEX = ["Calendar", "Message", "Pencil", "Sparkles"] as const;

export function EventsForm({ content }: { content: EventsContent }) {
  const [state, action, pending] = useActionState(saveEventsAction, initial);

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
        description="Four event cards. Icons are fixed by position (calendar / message / pencil / sparkles)."
        title="Events"
      >
        {[0, 1, 2, 3].map((i) => (
          <div className="admin-form-sub" key={i}>
            <p className="admin-form-sub-title">
              Event {i + 1} · icon: {ICON_BY_INDEX[i]}
            </p>
            <TextField
              defaultValue={content.items[i]?.title ?? ""}
              label="Title"
              name={`items.${i}.title`}
            />
            <FormRow>
              <TextField
                defaultValue={content.items[i]?.status ?? ""}
                label="Status badge text"
                name={`items.${i}.status`}
              />
              <label>
                <span>Status badge tone</span>
                <select
                  defaultValue={content.items[i]?.statusTone ?? "secondary"}
                  name={`items.${i}.statusTone`}
                >
                  <option value="secondary">Sage (default)</option>
                  <option value="outline">Outline (subtle)</option>
                </select>
              </label>
            </FormRow>
            <TextAreaField
              defaultValue={content.items[i]?.description ?? ""}
              label="Description"
              name={`items.${i}.description`}
              rows={4}
            />
          </div>
        ))}
      </FieldGroup>

      {state.error && <p className="admin-form-error">{state.error}</p>}
      {state.ok && <p className="admin-form-success">Saved.</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : "Save events page"}
        </Button>
      </div>
    </form>
  );
}
