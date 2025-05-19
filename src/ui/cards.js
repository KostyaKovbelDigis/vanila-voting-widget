import { useAppState } from "../state/state.js";
import { openEditModal } from "../components/modal.js";
import { VOTE_UP, VOTE_DOWN } from "../constants/index.js";
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
} from "../utils/drag-n-reorder.js";
import { getSortSelect } from "./controls.js";

export const renderCards = (data) => {
  const existing = document.getElementById("cards-container");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "cards-container";

  const { set: setCards } = useAppState;

  container.addEventListener("dragend", () => {
    const newOrder = [];
    const elements = container.querySelectorAll(".card");

    elements.forEach((el, index) => {
      const id = el.getAttribute("data-id");
      const original = data.find((item) => String(item.id) === id);
      if (original) {
        newOrder.push({ ...original, order: index });
      }
    });

    setCards(newOrder);

    const select = getSortSelect?.();
    if (select && select.value !== "none") {
      select.value = "none";
    }
  });

  data.forEach((item) => {
    const card = createCardComponent(item);

    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", item.id);

    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
    card.addEventListener("dragenter", handleDragEnter);
    card.addEventListener("dragleave", handleDragLeave);
    card.addEventListener("dragover", handleDragOver);
    card.addEventListener("drop", handleDrop);

    container.appendChild(card);
  });

  document.body.appendChild(container);
};

const createCardComponent = (cardData) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    ${
      cardData.image
        ? `<img src="${cardData.image}"  />`
        : `<div class="no-photo">No photo provided</div>`
    }
    <div class="card-content">
      <h4>${cardData.title}</h4>
      <p>${cardData.description}</p>

      <div class="votes">
        <button class="vote-btn" data-vote="${VOTE_UP}">👍 ${
    cardData.votes[VOTE_UP]
  }</button>
        <button class="vote-btn" data-vote="${VOTE_DOWN}">👎 ${
    cardData.votes[VOTE_DOWN]
  }</button>
      </div>

      <a href="${cardData.button.url}" target="_blank" class="card-link">
        ${cardData.button.label}
      </a>

      <div class="card-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;

  card.querySelector(".delete-btn").onclick = () => {
    useAppState.deleteById(cardData.id);
    renderCards(useAppState.get());
  };

  card.querySelectorAll(".vote-btn").forEach((btn) => {
    btn.onclick = () => {
      const voteType = btn.dataset.vote;
      cardData.votes[voteType]++;
      useAppState.set(
        useAppState.get().map((c) => (c.id === cardData.id ? cardData : c))
      );
      renderCards(useAppState.get());
    };
  });

  card.querySelector(".edit-btn").addEventListener("click", () => {
    openEditModal(cardData);
  });

  return card;
};
