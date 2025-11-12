// Team Member Types
export interface TeamMember {
  name: string;
  email: string;
  requirementLink: string;
  github_url: string;
  member_role?: "Hustler" | "Hipster" | "Hacker";
}

export interface TeamMemberDB {
  id: string;
  team_id: string;
  name: string;
  email: string | null;
  github_url: string | null;
  requirementLink: string | null;
  is_leader: boolean;
  created_at?: string;
  member_role: "Hustler" | "Hipster" | "Hacker";
}

export interface TeamLeader {
  name: string;
  email: string;
  github_url: string | null;
  requirementLink: string | null;
}

// Team approval status type
export type ApprovalStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Resubmitted"
  | "Submitted"
  | null;

// Team data interface
export interface TeamData {
  id: string;
  team_name: string;
  institution: string;
  whatsapp_number: string;
  paymentproof_url?: string;
  approvalstatus: ApprovalStatus;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}
