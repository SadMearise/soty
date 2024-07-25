import { RootState } from "../../store";

export const selectAlerts = (state: RootState) => state.alert.alerts;
