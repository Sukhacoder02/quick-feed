import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CORS_PROXY } from "../../../constants";


export const getFeeds = createAsyncThunk('getFeeds', async (args, thunkAPI) => {
  const { feedUrl } = args;
  const Parser = require('rss-parser');
  const parser = new Parser({
    customFields: {
      item: [['enclosure', { keepArray: true }]]
    }
  });
  const feed = await parser.parseURL(CORS_PROXY + feedUrl);
  return feed;

});

const FeedSlice = createSlice({
  name: 'feeds',
  initialState: {

    isLoading: false,
    isError: false,
    data: {}
  },
  reducers: {
    clearError: (state, action) => {
      return { ...state, isError: false };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      });
    builder
      .addCase(getFeeds.pending, (state, action) => {
        state.isLoading = true;
      });
    builder
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});
export const { clearError } = FeedSlice.actions;
export default FeedSlice.reducer;