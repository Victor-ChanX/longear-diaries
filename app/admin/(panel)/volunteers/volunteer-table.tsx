import { Trash2 } from "lucide-react";

import { getAvatarUrl, type VolunteerRecord } from "@/lib/storage/volunteers";

import { removeVolunteerAction } from "./actions";

// UTC-anchored YYYY-MM-DD prefix — locale/timezone-independent, so server
// HTML and client hydration always match.
const formatDate = (iso: string) => iso.slice(0, 10);

export function VolunteerTable({
  volunteers,
}: {
  volunteers: VolunteerRecord[];
}) {
  if (volunteers.length === 0) {
    return (
      <p className="admin-empty">
        No volunteer profiles yet. Use the form above to add the first one.
      </p>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Bio</th>
            <th>Added</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v.id}>
              <td>
                <img
                  alt={`${v.name} avatar`}
                  className="admin-avatar-thumb"
                  src={getAvatarUrl(v.avatarKey)}
                />
              </td>
              <td>
                <span className="admin-strong">{v.name}</span>
              </td>
              <td className="admin-bio-cell">{v.bio}</td>
              <td className="admin-muted">{formatDate(v.createdAt)}</td>
              <td>
                <form action={removeVolunteerAction}>
                  <input name="id" type="hidden" value={v.id} />
                  <button
                    aria-label={`Delete profile for ${v.name}`}
                    className="admin-icon-button"
                    type="submit"
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
