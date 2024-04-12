import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: { value: { gallery: [] } },
  reducers: {
    setGallery: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
