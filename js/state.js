const LOCAL_STATE_KEY = "localState";
const LOCAL_ORIGINAL_KEY = "localOriginalData";


const useAppState = (() => {
  let state = [];
  let original = [];

  const saveToLocal = () =>
    localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(state));

  return {
    get: () => [...state],

    // used for reset case
    getOriginal: () => [...original],
    set: (newState) => {
      state = [...newState];
      saveToLocal();
    },
    setOriginal: (data) => {
      original = [...data];
      localStorage.setItem(LOCAL_ORIGINAL_KEY, JSON.stringify(original));
    },
    reset: () => {
      const raw = localStorage.getItem(LOCAL_ORIGINAL_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      state = [...parsed];
      saveToLocal();
    },
    deleteById: (id) => {
      state = state.filter((card) => card.id !== id);
      localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(state));
    },
  };
})();

export default useAppState;
