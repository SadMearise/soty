import { Severity } from "../../../types/enums";

export interface AlertState {
  isVisibility: boolean;
  message: string;
  severity: Severity;
}
