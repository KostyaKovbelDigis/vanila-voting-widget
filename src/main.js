import { STORAGE_STATE_KEY } from "./constants/index.js";
import { getData } from "./api/api.js";
import { useAppState } from "./state/state.js";

import { renderCards, renderControls } from "./ui/ui.js";

const initApp = async () => {
  const localState = localStorage.getItem(STORAGE_STATE_KEY);

  if (localState) {
    useAppState.set(JSON.parse(localState));
  } else {
    const fetched = await getData();
    useAppState.set(fetched);
  }

  renderControls();
  renderCards(useAppState.get());
};

initApp();
