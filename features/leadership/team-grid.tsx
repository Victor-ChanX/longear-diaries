import { getAvatarUrl, listVolunteers } from "@/lib/storage/volunteers";

export async function TeamGrid() {
  const volunteers = await listVolunteers();

  if (volunteers.length === 0) {
    return (
      <div className="team-empty">
        <p>
          No profiles have been added yet. Once the team posts profiles through
          the admin panel, they&apos;ll appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className="team-grid" role="list">
      {volunteers.map((member) => (
        <li className="team-card" key={member.id}>
          <div className="team-card-avatar">
            <img
              alt={`${member.name} portrait`}
              loading="lazy"
              src={getAvatarUrl(member.avatarKey)}
            />
          </div>
          <h3>{member.name}</h3>
          <p className="team-card-bio">{member.bio}</p>
        </li>
      ))}
    </ul>
  );
}
