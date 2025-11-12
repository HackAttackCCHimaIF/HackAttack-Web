export type TeamMemberRole = "Hipster" | "Hustler" | "Hacker";

export default interface TeamMember {
  id: string;
  team_id: string;
  name: string;
  role: TeamMemberRole;
  created_at: string;
  requirementLink: string;
  github_url: string;
}

export interface Members {
  id: string;
  name: string;
  email: string;
  requirementLink: string;
  github_url: string;
  member_role?: TeamMemberRole | undefined;
  is_leader: boolean;
}
