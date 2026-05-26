export type TeamMember = {
  bio: string;
  id: string;
  image: string;
  isLead?: boolean;
  name: string;
  role: string;
};

export const teamMembers: TeamMember[] = [
  {
    bio: "Started LongEar Diaries to turn private notebooks of endangered-animal sketches into something the rest of the world could read along with. Steers creative direction across every channel.",
    id: "sarah",
    image: "/team/sarah.jpg",
    name: "Sarah",
    role: "Founder & Chief Creative Officer",
  },
  {
    bio: "Builds the visual language of each animal profile — colour palettes, illustration style, and the way habitats are rendered on screen and on social.",
    id: "olivia",
    image: "/team/olivia.jpg",
    name: "Olivia",
    role: "Wildlife Design Architect",
  },
  {
    bio: "Designs habitat backdrops and creature studies. Splits her time between sketchbook research and the digital touch-ups that make our cards pop.",
    id: "dora",
    image: "/team/dora.jpg",
    name: "Dora",
    role: "Wildlife Design Architect",
  },
  {
    bio: "Team lead for the research pod. Reads the papers, runs the fact-checks, and consolidates everyone's notes into the briefs that turn into published profiles.",
    id: "olivia-xu",
    image: "/team/olivia-xu.jpg",
    isLead: true,
    name: "Olivia Xu",
    role: "Research & Conservation Analyst (Lead)",
  },
  {
    bio: "Tracks IUCN status changes and field reports so our profiles never publish with stale numbers. Specialises in marine and wetland species.",
    id: "mary",
    image: "/team/mary.jpg",
    name: "Mary",
    role: "Research & Conservation Analyst",
  },
  {
    bio: "Researches habitat pressures and human–wildlife conflict. Loves a footnote — every claim in our profiles can be traced back to one.",
    id: "celine",
    image: "/team/celine.jpg",
    name: "Celine",
    role: "Research & Conservation Analyst",
  },
  {
    bio: "Runs the RedNote and Instagram presence — caption voice, posting cadence, and the comment threads where our community Q&A starts.",
    id: "belinda",
    image: "/team/belinda.jpg",
    name: "Belinda",
    role: "Content & Community Curator",
  },
  {
    bio: "Builds and maintains this website — the 3D globe, the page structure, and the plumbing that keeps everything fast and accessible.",
    id: "victor",
    image: "/team/victor.jpg",
    name: "Victor",
    role: "Digital Habitat Designer",
  },
];
