import { useAppState } from "../state/state.js";
import { renderCards } from "../ui/cards.js";
import {
  readFileAsBase64,
  getCardFromModal,
  getSortedCards,
} from "../utils/helpers.js";

export const openEditModal = (data) => {
  const modal = document.createElement("div");
  modal.className = "modal";

  const isNew = !data.id;

  modal.innerHTML = `
    <div class="modal-content">
      <h3>${isNew ? "Add New Card" : "Edit Card"}</h3>

      <label>Title</label>
      <input id="title" class="modal-input" value="${data.title}" />

      <label>Description</label>
      <textarea id="description" class="modal-textarea">${
        data.description
      }</textarea>

      <label>Image</label>
      <img id="preview" class="modal-preview" style="display: ${
        data.image ? "block" : "none"
      };" src="${data.image}" />
      <input type="file" id="imageUpload" accept="image/*" class="modal-upload-input" />

      <label>Button Label</label>
      <input id="label" class="modal-input" value="${data.button.label}" />

      <label>Button URL</label>
      <input id="url" class="modal-input" value="${data.button.url}" />

      <div class="modal-actions">
        <button id="save">Save</button>
        <button id="cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("imageUpload").onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    const preview = document.getElementById("preview");
    preview.src = base64;
    preview.style.display = "block";
  };

  document.getElementById("cancel").onclick = () => modal.remove();

  document.getElementById("save").onclick = () => {
    const currentCard = getCardFromModal(data);
    const cards = useAppState.get();

    const select = document.getElementById("sortSelect");

    if (isNew) {
      const maxId = cards.reduce((acc, cur) => Math.max(acc, cur.id), 0);
      currentCard.id = maxId + 1;

      currentCard.order = cards.length + 1;
      const updatedCards = [...cards, currentCard];
      const sortedCards = getSortedCards(updatedCards, select?.value);

      useAppState.set(sortedCards);
    } else {
      const updatedCards = cards.map((card) =>
        card.id === currentCard.id ? currentCard : card
      );

      useAppState.set(updatedCards);
    }

    renderCards(useAppState.get());
    modal.remove();
  };
};
