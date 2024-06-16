import { RootState } from "../../store";

export const selectIsVisibility = (state: RootState) => state.alert.isVisibility;
export const selectMessage = (state: RootState) => state.alert.message;
export const selectSeverity = (state: RootState) => state.alert.severity;
