// Editable text for every public page. The DB row mirrors the same shape;
// these defaults are used until an admin overrides them.

export type HomeContent = {
  cta: {
    body: string;
    eyebrow: string;
    primaryLabel: string;
    secondaryLabel: string;
    title: string;
  };
  hero: {
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    eyebrow: string;
    titleEmphasis: string;
    titlePost: string;
    titlePre: string;
  };
  manifesto: {
    attribution: string;
    eyebrow: string;
    quote: string;
  };
  stats: {
    item1Label: string;
    item2Label: string;
    item2Number: string;
    item2Suffix: string;
    item3Label: string;
    item3Number: string;
    item4Label: string;
    item4Number: string;
    item4Suffix: string;
  };
  values: {
    eyebrow: string;
    items: { body: string; kicker: string; title: string }[]; // exactly 3
    title: string;
  };
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    subtitle: string;
    title: string;
  };
  sections: { body: string; title: string }[]; // 4 sections
};

export type EventsContent = {
  hero: {
    eyebrow: string;
    subtitle: string;
    title: string;
  };
  items: {
    description: string;
    status: string;
    statusTone: "secondary" | "outline";
    title: string;
  }[]; // 4 items, icons positional
};

export type ContactContent = {
  channels: {
    description: string;
    handle: string;
    href: string;
    label: string;
  }[]; // 3 channels, icons positional
  hero: {
    eyebrow: string;
    subtitle: string;
    title: string;
  };
};

export const DEFAULT_HOME_CONTENT: HomeContent = {
  cta: {
    body: "That's the whole loop. Every share, every conversation, every quiet read counts as conservation reach.",
    eyebrow: "Start anywhere",
    primaryLabel: "Browse the catalogue",
    secondaryLabel: "Send a Q&A question",
    title: "Pick a species. Read its story. Pass it on.",
  },
  hero: {
    body: "Spin the planet. Click any animal pinned to its native range to open a profile with habitat, status, and the story behind why it matters.",
    ctaPrimary: "Open the first entry",
    ctaSecondary: "Read the manifesto",
    eyebrow: "Species Globe · Issue 01",
    titleEmphasis: "the edge",
    titlePost: "of disappearance.",
    titlePre: "Field notes from",
  },
  manifesto: {
    attribution: "— The editors of LongEar Diaries",
    eyebrow: "Manifesto",
    quote:
      "We don't fundraise. We don't broker donations. We sit with one animal at a time and write it down — carefully, slowly — then point at the people doing the saving.",
  },
  stats: {
    item1Label: "Species profiled",
    item2Label: "Issues per month",
    item2Number: "01",
    item2Suffix: "issue",
    item3Label: "Mini-comics dropped",
    item3Number: "∞",
    item4Label: "Donation forms here",
    item4Number: "0",
    item4Suffix: "we're a bridge",
  },
  values: {
    eyebrow: "How we work",
    items: [
      {
        body: "We publish one careful, single-species profile at a time — habitat, threats, and the story behind why it matters. Reach is a side effect.",
        kicker: "Method",
        title: "Story-first, not scroll-first",
      },
      {
        body: "We point readers toward the conservation organisations doing the work on the ground. The diary is a bridge, never a fundraiser.",
        kicker: "Mission",
        title: "A bridge to the field",
      },
      {
        body: "Built by a small student team learning conservation by doing — design, research, writing, illustration, and engineering.",
        kicker: "People",
        title: "Student-led, peer-reviewed",
      },
    ],
    title: "Three rules, kept honestly.",
  },
};

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  hero: {
    eyebrow: "About",
    subtitle:
      "A short version of where the project came from, what the name means, and where we'd like it to go next.",
    title: "Why we started a diary for endangered animals.",
  },
  sections: [
    {
      body: "LongEar Diaries began as a private notebook — a habit of sketching and writing about animals we kept reading about in conservation papers but never seeing in everyday feeds. The notebook outgrew itself. We started turning each entry into a short, shareable profile, and a few months later we were a small team.",
      title: "Our story",
    },
    {
      body: "“LongEar” is a nod to the species that are easy to miss: the long-eared, the lesser-known, the ones whose ranges sit just outside the standard wildlife-doc spotlight. “Diaries” is how we'd like our profiles to feel — careful, personal, published one entry at a time.",
      title: "The name",
    },
    {
      body: "Conservation organisations are doing the hard work. We're not here to replicate that or fundraise on top of it. We're here as a bridge: pointing audiences and curiosity toward the species, ecosystems, and people that need attention — and toward the organisations doing something about it.",
      title: "Why we do this",
    },
    {
      body: "Reach: every animal we profile reaches at least one person who hadn't heard of it before.\nAccuracy: every claim traces back to a paper, a report, or a partner organisation we can name.\nBridge: every entry links readers to a conservation org actually doing the work on the ground.",
      title: "What we're aiming for",
    },
  ],
};

export const DEFAULT_EVENTS_CONTENT: EventsContent = {
  hero: {
    eyebrow: "Events",
    subtitle:
      "Everything below runs out of the same diary — only the format changes. Come learn, ask, laugh at our doodles, or pick up volunteer hours when the programme opens.",
    title: "Live talks, Q&As, comics, and ways to get involved.",
  },
  items: [
    {
      description:
        "Our first online lecture is planned for August–September. Topic, speakers, and registration link will be announced here closer to the date — follow our RedNote / Instagram for the drop.",
      status: "Coming Aug–Sep",
      statusTone: "secondary",
      title: "Online Lecture",
    },
    {
      description:
        "We collect questions from our RedNote and Instagram comments on a rolling basis and answer them in a dedicated Q&A session every so often. Drop your question via email or DM and we'll bundle it in.",
      status: "Rolling",
      statusTone: "secondary",
      title: "Interactive Q&A",
    },
    {
      description:
        "Once a month we take the animals featured that period and weave them into a short 1–2 page comic — silly dialogue, real biology — to showcase the personalities and traits of endangered species.",
      status: "Monthly",
      statusTone: "secondary",
      title: "Monthly Mini Comic",
    },
    {
      description:
        "A volunteer programme is in the works: pick an animal we've featured, make a poster or write a 150-word advocacy letter, and submit it for volunteer hours. Submission portal launches in a later release.",
      status: "Coming soon",
      statusTone: "outline",
      title: "Volunteer Programme",
    },
  ],
};

export const DEFAULT_CONTACT_CONTENT: ContactContent = {
  channels: [
    {
      description:
        "Our daily home — every published animal profile lands here first.",
      handle: "@LongEarDiaries",
      href: "https://www.xiaohongshu.com/",
      label: "RedNote (小红书)",
    },
    {
      description:
        "Mirror of our RedNote feed for friends outside mainland China.",
      handle: "@longear.diaries",
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      description:
        "Send questions for our Interactive Q&A sessions, story pitches, or anything that doesn't fit a DM.",
      handle: "hello@longeardiaries.example",
      href: "mailto:hello@longeardiaries.example",
      label: "Email",
    },
  ],
  hero: {
    eyebrow: "Contact",
    subtitle:
      "DMs on RedNote and Instagram are open. Email is the best place to send Q&A questions you'd like us to answer in a future session.",
    title: "Reach the diary.",
  },
};
