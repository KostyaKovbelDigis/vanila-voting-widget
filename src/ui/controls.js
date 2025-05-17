import {
  ID_CONTROLS,
  BTN_RESET_CLASS,
  BTN_ADD_CLASS,
} from "../constants/index.js";
import { useAppState } from "../state/state.js";
import { renderCards } from "./cards.js";
import { openEditModal } from "../components/modal.js";

let sortSelectEl = null;

export const renderControls = () => {
  const bar = document.createElement("div");
  bar.id = ID_CONTROLS;

  bar.innerHTML = `
    <button class="${BTN_RESET_CLASS}">Reset</button>
    <button class="${BTN_ADD_CLASS}">Add</button>
    <select id="sortSelect" class="sort-select">
        <option value="none">No sort</option>
        <option value="votesDesc">Top voted</option>
        <option value="votesAsc">Less voted</option>
    </select>
  `;

  sortSelectEl = bar.querySelector("#sortSelect");

  bar.querySelector(`.${BTN_RESET_CLASS}`).onclick = async () => {
    await useAppState.reset();
    renderCards(useAppState.get());
  };

  sortSelectEl.onchange = (e) => {
    const value = e.target.value;
    const data = useAppState.get().slice();

    if (value === "votesDesc") {
      data.sort(
        (a, b) => b.votes.up + b.votes.down - (a.votes.up + a.votes.down)
      );
      renderCards(data);
    } else if (value === "votesAsc") {
      data.sort(
        (a, b) => a.votes.up + a.votes.down - (b.votes.up + b.votes.down)
      );
      renderCards(data);
    } else {
      data.sort((a, b) => a.order - b.order);
      renderCards(data);
    }
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
