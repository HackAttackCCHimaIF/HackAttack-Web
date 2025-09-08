export interface Submission {
  id: string;
  proposal_url: string;
  status: 'Valid' | 'Invalid' | 'Pending';
  team_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubmissionFormValues {
  proposal_url: string;
}