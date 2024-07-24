import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertState } from "./types";
import { Severity } from "../../../types/enums";

const initialState: AlertState = {
  isVisibility: false,
  message: "An error occurred",
  severity: Severity.Error,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<boolean>) => {
      state.isVisibility = action.payload;
    },
    initAlert: (state, action: PayloadAction<Pick<AlertState, "message" | "severity">>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
  },
});

export const { showAlert, initAlert } = alertSlice.actions;

export default alertSlice;
