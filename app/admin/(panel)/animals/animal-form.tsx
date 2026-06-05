"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";

import {
  createAnimalAction,
  updateAnimalAction,
  type AnimalFormState,
} from "./actions";

const initialState: AnimalFormState = {};

type Defaults = {
  caption?: string;
  conservationStatus?: string;
  description?: string;
  habitat?: string;
  id?: string;
  imagePreview?: string | null;
  lat?: number;
  lng?: number;
  objectPosition?: string;
  origin?: string;
  populationNote?: string;
  rotate?: number;
  scientificName?: string;
  sortOrder?: number;
};

type AnimalFormProps = {
  defaults?: Defaults;
  /** When set, the form submits an update. Otherwise it creates a new animal. */
  editId?: string;
  submitLabel: string;
};

export function AnimalForm({ defaults, editId, submitLabel }: AnimalFormProps) {
  const boundAction = editId
    ? updateAnimalAction.bind(null, editId)
    : createAnimalAction;

  const [state, formAction, pending] = useActionState(
    boundAction,
    initialState,
  );

  return (
    <form action={formAction} className="admin-form">
      <div className="admin-form-row">
        <label>
          <span>Name (display caption)</span>
          <input
            defaultValue={defaults?.caption ?? ""}
            name="caption"
            required
            type="text"
          />
        </label>
        <label>
          <span>Scientific name</span>
          <input
            defaultValue={defaults?.scientificName ?? ""}
            name="scientificName"
            required
            type="text"
          />
        </label>
      </div>

      {!editId && (
        <label>
          <span>
            ID slug (optional — generated from name if blank, e.g.{" "}
            <code>animal-akita</code>)
          </span>
          <input
            defaultValue={defaults?.id ?? ""}
            name="id"
            placeholder="animal-…"
            type="text"
          />
        </label>
      )}

      <label>
        <span>Description</span>
        <textarea
          defaultValue={defaults?.description ?? ""}
          name="description"
          required
          rows={4}
        />
      </label>

      <div className="admin-form-row">
        <label>
          <span>Habitat</span>
          <input
            defaultValue={defaults?.habitat ?? ""}
            name="habitat"
            required
            type="text"
          />
        </label>
        <label>
          <span>Conservation status</span>
          <input
            defaultValue={defaults?.conservationStatus ?? ""}
            name="conservationStatus"
            placeholder="e.g. Endangered"
            required
            type="text"
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Origin</span>
          <input
            defaultValue={defaults?.origin ?? ""}
            name="origin"
            placeholder="Region or country"
            required
            type="text"
          />
        </label>
        <label>
          <span>Population note</span>
          <input
            defaultValue={defaults?.populationNote ?? ""}
            name="populationNote"
            type="text"
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Latitude (-90 to 90)</span>
          <input
            defaultValue={defaults?.lat ?? ""}
            name="lat"
            required
            step="0.0001"
            type="number"
          />
        </label>
        <label>
          <span>Longitude (-180 to 180)</span>
          <input
            defaultValue={defaults?.lng ?? ""}
            name="lng"
            required
            step="0.0001"
            type="number"
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Polaroid rotate (leave blank = auto, or -45 to 45 deg)</span>
          <input
            defaultValue={defaults?.rotate ?? ""}
            min="-45"
            max="45"
            name="rotate"
            placeholder="auto"
            step="1"
            type="number"
          />
        </label>
        <label>
          <span>Image crop (leave blank = center)</span>
          <input
            defaultValue={defaults?.objectPosition ?? ""}
            name="objectPosition"
            placeholder="50% 50%"
            type="text"
          />
        </label>
        <label>
          <span>Sort order (leave blank = append to end)</span>
          <input
            defaultValue={defaults?.sortOrder ?? ""}
            name="sortOrder"
            placeholder="auto"
            step="10"
            type="number"
          />
        </label>
      </div>

      <label>
        <span>
          Image (JPG / PNG / WebP, ≤ 6 MB).{" "}
          {editId ? "Leave blank to keep the current image." : "Optional."}
        </span>
        <input
          accept="image/jpeg,image/png,image/webp,image/gif"
          name="image"
          type="file"
        />
      </label>

      {defaults?.imagePreview && (
        <div className="admin-form-current-image">
          <span className="admin-muted">Current image:</span>
          <img alt="Current" src={defaults.imagePreview} />
        </div>
      )}

      {state.error && <p className="admin-form-error">{state.error}</p>}
      {state.ok && <p className="admin-form-success">Saved.</p>}

      <div className="admin-form-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
