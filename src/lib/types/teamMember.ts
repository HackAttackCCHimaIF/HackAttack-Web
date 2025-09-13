export type TeamMemberRole = "Hipster" | "Hustler" | "Hacker";

export default interface TeamMember {
  id: string;
  team_id: string;
  name: string;
  nim: string;
  role: TeamMemberRole;
  cv_link: string;
  porto_link: string;
  ktm_link: string;
  twibbon_link: string;
  created_at: string;
}
