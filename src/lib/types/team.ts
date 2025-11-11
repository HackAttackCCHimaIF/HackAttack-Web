import TeamMember from "./teamMember";

export default interface Team {
  id: string;
  created_by: string;
  team_name: string;
  institution: string;
  created_at: string;
  approvalstatus: string;
  paymentproof_url: string;
  whatsapp_number: string;
  reject_message?: string;
}

export interface TeamWithMember extends TeamMember {
  team_member: TeamMember[];
}
