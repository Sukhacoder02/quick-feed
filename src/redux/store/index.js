import { configureStore } from "@reduxjs/toolkit";
import FeedReducer from './../slices/Feed';
import PreviousFeedReducer from './../slices/PreviousFeed';
const store = configureStore({
  reducer: {
    feed: FeedReducer,
    previousFeeds: PreviousFeedReducer
  }
});
export default store;