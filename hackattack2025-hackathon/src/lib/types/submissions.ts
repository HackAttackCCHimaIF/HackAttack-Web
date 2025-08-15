export type StatusType = " Valid" | "Invalid" | "Pending";

export default interface Submission {
  id: string;
  team_id: string;
  proposal_link: string;
  project_link: string;
  description: string;
  sumbitted_at: string;
  status: StatusType;
}
