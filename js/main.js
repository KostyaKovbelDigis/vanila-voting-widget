import { getData } from "./api.js";
import useAppState from "./state.js";
import { renderCards, renderControls } from "./ui.js";

// A simple componentDidMount analog:
// we check local storage first — if data exists, we use it.
// The API is fetched only once on initial load.
// Since I dont have an endpoint for update or delete operations,
// Im using localStorage as my "fake API".

const initApp = async () => {
  const stored = localStorage.getItem("localState");

  if (stored) {
    useAppState.set(JSON.parse(stored));
  } else {
    const fetched = await getData();
    useAppState.set(fetched);
    useAppState.setOriginal(fetched);
  }

  renderControls();
  renderCards(useAppState.get());
};

initApp();
