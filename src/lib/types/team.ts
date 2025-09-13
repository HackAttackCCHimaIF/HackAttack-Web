import TeamMember from "./teamMember";

export default interface Team {
  id: string;
  created_by: string;
  team_name: string;
  institution: string;
  created_at: string;
}

export interface TeamWithMember extends TeamMember {
  team_member: TeamMember[];
}
