import { STORAGE_STATE_KEY } from "../constants/index.js";
import { getData } from "../api/api.js";

export const useAppState = (() => {
  let state = [];

  const saveToLocal = () =>
    localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(state));

  return {
    get: () => [...state],
    set: (newState) => {
      if (!newState) {
        return;
      }
      state = [...newState];
      saveToLocal();
    },
    reset: async () => {
      const fresh = await getData();
      state = [...fresh];
      saveToLocal();
    },
    deleteById: (id) => {
      state = state.filter((card) => card.id !== id);
      localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(state));
    },
  };
})();
