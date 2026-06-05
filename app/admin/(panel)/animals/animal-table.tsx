import Link from "next/link";

import { Pencil, Trash2 } from "lucide-react";

import type { AnimalMarker } from "@/lib/data/animals";

import { deleteAnimalAction } from "./actions";

export function AnimalTable({ animals }: { animals: AnimalMarker[] }) {
  if (animals.length === 0) {
    return (
      <p className="admin-empty">
        No animals yet. Use the &ldquo;New animal&rdquo; button above to add
        one.
      </p>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Scientific</th>
            <th>Origin</th>
            <th>Status</th>
            <th>Coords</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {animals.map((a) => (
            <tr key={a.id}>
              <td>
                {a.image ? (
                  <div
                    aria-hidden="true"
                    className="admin-animal-thumb"
                    style={{
                      backgroundImage: `url(${a.image})`,
                      backgroundPosition: a.objectPosition,
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="admin-animal-thumb admin-animal-thumb-empty"
                  >
                    {a.caption.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </td>
              <td>
                <span className="admin-strong">{a.caption}</span>
                <p className="admin-muted">{a.id}</p>
              </td>
              <td className="admin-muted">{a.scientificName}</td>
              <td>{a.origin}</td>
              <td>{a.conservationStatus}</td>
              <td className="admin-muted">
                {a.location[0].toFixed(2)}, {a.location[1].toFixed(2)}
              </td>
              <td>
                <div className="admin-row-actions">
                  <Link
                    aria-label={`Edit ${a.caption}`}
                    className="admin-icon-button is-neutral"
                    href={`/admin/animals/${a.id}`}
                  >
                    <Pencil aria-hidden="true" />
                  </Link>
                  <form action={deleteAnimalAction}>
                    <input name="id" type="hidden" value={a.id} />
                    <button
                      aria-label={`Delete ${a.caption}`}
                      className="admin-icon-button"
                      type="submit"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
