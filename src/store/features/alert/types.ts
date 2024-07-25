import { Severity } from "../../../types/enums";

export interface Alert {
  id: number;
  message: string;
  severity: Severity;
}

export interface AlertState {
  alerts: Alert[];
}
