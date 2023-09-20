import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import "./App.css";
import EpisodeList from "./components/EpisodeList";
import UserForm from "./components/UserForm";
import LoadingStatus from "./components/LoadingStatus";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getFeeds } from "./redux/slices/Feed";
import { addFeed } from "./redux/slices/PreviousFeed";


const App = ({ fetching }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.feed);
  const { previousFeeds, past } = useSelector(state => state.previousFeeds);

  const getFeed = (event) => {
    if (event.preventDefault != null)
      event.preventDefault();
    const feed_url = event.target.elements.feed_url.value;
    if (feed_url) {
      dispatch(addFeed(feed_url));
      dispatch(getFeeds({ feedUrl: feed_url }));
    } else {
      return;
    }
  };

  const handleClose = () => {
    dispatch(clearError());
  };

  const renderAlert = () => {
    return (
      <div>
        <Dialog
          open={isError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error Parsing Feed</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please try retyping your RSS feed, or try a new one.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">quick-feed</h1>
      </header>
      <UserForm
        getFeed={getFeed}
        past={past}
        previous_feeds={previousFeeds}
      />
      {isError && renderAlert()}
      {!(past) ? <p style={{ marginTop: '25px' }}> Please enter an RSS feed</p> : <div></div>}
      {isLoading && <LoadingStatus fetching={true} />}
      {data && data.image &&
        <EpisodeList
          episodes={data.items}
          program_title={data.title}
          program_description={data.description}
          program_image={data.image.url}
          fetching={fetching}
        />
      }
    </div>
  );
};

export default App;
