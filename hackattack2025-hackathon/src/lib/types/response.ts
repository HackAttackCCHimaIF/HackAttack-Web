import Registration from "@/lib/types/registration";
import Submission from "@/lib/types/submissions";
import Team from "@/lib/types/team";
import TeamMember from "@/lib/types/teamMember";

export default interface Response {
  success: boolean;
  message: string;
  data?:
    | Registration
    | Submission
    | Team
    | TeamMember
    | Registration[]
    | Submission[]
    | TeamMember[]
    | Team[];

  error?: string;
}
