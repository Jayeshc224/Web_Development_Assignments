import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: { value: { jobs: [] } },
  reducers: {
    setJobs: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
