"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { AboutContent } from "@/lib/data/site-defaults";

import { FieldGroup, TextAreaField, TextField } from "../form-fields";
import { saveAboutAction, type SectionState } from "./actions";

const initial: SectionState = {};

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, action, pending] = useActionState(saveAboutAction, initial);

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
        description="Long-form sections rendered one after another. Use blank lines in the body to start a new paragraph."
        title="Sections"
      >
        {[0, 1, 2, 3].map((i) => (
          <div className="admin-form-sub" key={i}>
            <p className="admin-form-sub-title">Section {i + 1}</p>
            <TextField
              defaultValue={content.sections[i]?.title ?? ""}
              label="Heading"
              name={`sections.${i}.title`}
            />
            <TextAreaField
              defaultValue={content.sections[i]?.body ?? ""}
              label="Body"
              name={`sections.${i}.body`}
              rows={6}
            />
          </div>
        ))}
      </FieldGroup>

      {state.error && <p className="admin-form-error">{state.error}</p>}
      {state.ok && <p className="admin-form-success">Saved.</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : "Save about page"}
        </Button>
      </div>
    </form>
  );
}
