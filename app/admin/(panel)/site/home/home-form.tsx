"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { HomeContent } from "@/lib/data/site-defaults";

import { FieldGroup, FormRow, TextAreaField, TextField } from "../form-fields";
import { saveHomeAction, type SectionState } from "./actions";

const initial: SectionState = {};

export function HomeForm({ content }: { content: HomeContent }) {
  const [state, action, pending] = useActionState(saveHomeAction, initial);

  return (
    <form action={action} className="admin-form">
      <FieldGroup
        description="Top of the home page. The emphasis word is rendered italic in the brand colour."
        title="Hero"
      >
        <TextField
          defaultValue={content.hero.eyebrow}
          label="Eyebrow"
          name="hero.eyebrow"
        />
        <FormRow>
          <TextField
            defaultValue={content.hero.titlePre}
            label="Title — before emphasis"
            name="hero.titlePre"
          />
          <TextField
            defaultValue={content.hero.titleEmphasis}
            label="Title — italic emphasis"
            name="hero.titleEmphasis"
          />
          <TextField
            defaultValue={content.hero.titlePost}
            label="Title — after emphasis"
            name="hero.titlePost"
          />
        </FormRow>
        <TextAreaField
          defaultValue={content.hero.body}
          label="Body"
          name="hero.body"
          rows={3}
        />
        <FormRow>
          <TextField
            defaultValue={content.hero.ctaPrimary}
            label="Primary CTA label"
            name="hero.ctaPrimary"
          />
          <TextField
            defaultValue={content.hero.ctaSecondary}
            label="Secondary CTA label"
            name="hero.ctaSecondary"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup title="Manifesto">
        <TextField
          defaultValue={content.manifesto.eyebrow}
          label="Eyebrow"
          name="manifesto.eyebrow"
        />
        <TextAreaField
          defaultValue={content.manifesto.quote}
          label="Quote"
          name="manifesto.quote"
          rows={4}
        />
        <TextField
          defaultValue={content.manifesto.attribution}
          label="Attribution"
          name="manifesto.attribution"
        />
      </FieldGroup>

      <FieldGroup
        description="The first stat number comes from the live animal count. The other three are editable."
        title="Stats"
      >
        <TextField
          defaultValue={content.stats.item1Label}
          label="Stat 1 — label"
          name="stats.item1Label"
        />
        <FormRow>
          <TextField
            defaultValue={content.stats.item2Number}
            label="Stat 2 — number"
            name="stats.item2Number"
          />
          <TextField
            defaultValue={content.stats.item2Label}
            label="Stat 2 — label"
            name="stats.item2Label"
          />
          <TextField
            defaultValue={content.stats.item2Suffix}
            label="Stat 2 — suffix"
            name="stats.item2Suffix"
          />
        </FormRow>
        <FormRow>
          <TextField
            defaultValue={content.stats.item3Number}
            label="Stat 3 — number"
            name="stats.item3Number"
          />
          <TextField
            defaultValue={content.stats.item3Label}
            label="Stat 3 — label"
            name="stats.item3Label"
          />
        </FormRow>
        <FormRow>
          <TextField
            defaultValue={content.stats.item4Number}
            label="Stat 4 — number"
            name="stats.item4Number"
          />
          <TextField
            defaultValue={content.stats.item4Label}
            label="Stat 4 — label"
            name="stats.item4Label"
          />
          <TextField
            defaultValue={content.stats.item4Suffix}
            label="Stat 4 — suffix"
            name="stats.item4Suffix"
          />
        </FormRow>
      </FieldGroup>

      <FieldGroup
        description="Three positional value cards. Icons are fixed by position (book / sprout / sparkles)."
        title="Values"
      >
        <FormRow>
          <TextField
            defaultValue={content.values.eyebrow}
            label="Eyebrow"
            name="values.eyebrow"
          />
          <TextField
            defaultValue={content.values.title}
            label="Section title"
            name="values.title"
          />
        </FormRow>
        {[0, 1, 2].map((i) => (
          <div className="admin-form-sub" key={i}>
            <p className="admin-form-sub-title">Value {i + 1}</p>
            <FormRow>
              <TextField
                defaultValue={content.values.items[i]?.kicker ?? ""}
                label="Kicker"
                name={`values.items.${i}.kicker`}
              />
              <TextField
                defaultValue={content.values.items[i]?.title ?? ""}
                label="Title"
                name={`values.items.${i}.title`}
              />
            </FormRow>
            <TextAreaField
              defaultValue={content.values.items[i]?.body ?? ""}
              label="Body"
              name={`values.items.${i}.body`}
              rows={3}
            />
          </div>
        ))}
      </FieldGroup>

      <FieldGroup title="Closing CTA band">
        <TextField
          defaultValue={content.cta.eyebrow}
          label="Eyebrow"
          name="cta.eyebrow"
        />
        <TextField
          defaultValue={content.cta.title}
          label="Title"
          name="cta.title"
        />
        <TextAreaField
          defaultValue={content.cta.body}
          label="Body"
          name="cta.body"
          rows={2}
        />
        <FormRow>
          <TextField
            defaultValue={content.cta.primaryLabel}
            label="Primary CTA label"
            name="cta.primaryLabel"
          />
          <TextField
            defaultValue={content.cta.secondaryLabel}
            label="Secondary CTA label"
            name="cta.secondaryLabel"
          />
        </FormRow>
      </FieldGroup>

      {state.error && <p className="admin-form-error">{state.error}</p>}
      {state.ok && <p className="admin-form-success">Saved.</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : "Save home content"}
        </Button>
      </div>
    </form>
  );
}
