"use client";

import { Badge } from "@/components/ui/badge";

import { teamMembers } from "./data";

export function TeamGrid() {
  return (
    <ul className="team-grid" role="list">
      {teamMembers.map((member) => (
        <li className="team-card" key={member.id}>
          <div className="team-card-media">
            <img
              alt={`${member.name} portrait`}
              loading="lazy"
              onError={(event) => {
                const img = event.currentTarget;
                img.src = "/IMG_7988.jpg";
                img.style.objectPosition = "center";
              }}
              src={member.image}
            />
          </div>
          <div className="team-card-body">
            {member.isLead && <Badge variant="secondary">Team lead</Badge>}
            <h3>{member.name}</h3>
            <p className="team-card-role">{member.role}</p>
            <p className="team-card-bio">{member.bio}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
