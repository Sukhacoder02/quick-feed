import { createSlice } from "@reduxjs/toolkit";

const PreviousFeeds = createSlice({
  name: 'previousFeeds',
  initialState: {
    previousFeeds: [],
    past: false
  },
  reducers: {
    addFeed: (state, action) => {
      if (!state.previousFeeds.includes(action.payload)) {
        state.previousFeeds = [...state.previousFeeds, action.payload];
        state.past = true;
      }
    }
  }
});
export const { addFeed } = PreviousFeeds.actions;
export default PreviousFeeds.reducer;