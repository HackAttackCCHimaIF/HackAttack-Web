// Team Member Types
export interface TeamMember {
  name: string;
  email: string;
  github?: string;
  requirementLink: string;
  member_role?: "Hustler" | "Hipster" | "Hacker";
}

export interface TeamMemberDB {
  id: string;
  team_id: string;
  name: string;
  email: string | null;
  github_url: string | null;
  data_url: string | null;
  is_leader: boolean;
  created_at?: string;
  member_role: "Hustler" | "Hipster" | "Hacker";
}

export interface TeamLeader {
  name: string;
  email: string;
  github_url?: string | null;
  data_url: string;
}

// export interface TeamFormInput {
//   // Leader fields
//   leaderName: string;
//   leaderEmail: string;
//   leaderGithub?: string;
//   requirementLink: string;

//   // Team members
//   members: TeamMember[];

//   // Team details
//   teamName: string;
//   institution: string;
//   whatsapp_number: string;
//   paymentproof_url?: string;
// }
