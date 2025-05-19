import {
  ID_CONTROLS,
  BTN_RESET_CLASS,
  BTN_ADD_CLASS,
  ASC,
  DESC,
} from "../constants/index.js";
import { useAppState } from "../state/state.js";
import { renderCards } from "./cards.js";
import { openEditModal } from "../components/modal.js";
import { getSortedCards } from "../utils/helpers.js";

let sortSelectEl = null;

export const renderControls = () => {
  const bar = document.createElement("div");
  bar.id = ID_CONTROLS;

  bar.innerHTML = `
    <button class="${BTN_RESET_CLASS}">Reset</button>
    <button class="${BTN_ADD_CLASS}">Add</button>
    <select id="sortSelect" class="sort-select">
        <option value="none">No sort</option>
        <option value="${ASC}">Top voted</option>
        <option value="${DESC}">Less voted</option>
    </select>
  `;

  sortSelectEl = bar.querySelector("#sortSelect");

  bar.querySelector(`.${BTN_RESET_CLASS}`).onclick = async () => {
    await useAppState.reset();
    if (sortSelectEl) {
      sortSelectEl.value = "none";
    }
    renderCards(useAppState.get());
  };

  sortSelectEl.onchange = (e) => {
    const value = e.target.value;
    const data = useAppState.get().slice();

    const sorted = getSortedCards(data, value);
    useAppState.set(sorted);
    renderCards(sorted);
  };

  bar.querySelector(`.${BTN_ADD_CLASS}`).onclick = () =>
    openEditModal({
      title: "",
      description: "",
      image: "",
      votes: { up: 0, down: 0 },
      button: { label: "Learn More", url: "#" },
    });

  document.body.prepend(bar);
};

export const getSortSelect = () => sortSelectEl;
