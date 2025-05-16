import useAppState from "./state.js";
import { renderCards } from "./ui.js";

const openEditModal = (data) => {
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

  document.getElementById("imageUpload").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const preview = document.getElementById("preview");
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  };

  document.getElementById("cancel").onclick = () => modal.remove();

  document.getElementById("save").onclick = () => {
    const newCard = {
      ...data,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      image:
        document.getElementById("preview").style.display === "none"
          ? ""
          : document.getElementById("preview").src,
      button: {
        label: document.getElementById("label").value,
        url: document.getElementById("url").value,
      },
    };

    const cards = useAppState.get();

    if (isNew) {
      newCard.id = cards.length + 1;
      useAppState.set([...cards, newCard]);
    } else {
      const updatedCards = cards.map((card) =>
        card.id === newCard.id ? newCard : card
      );
      useAppState.set(updatedCards);
    }

    renderCards(useAppState.get());
    modal.remove();
  };
};

export default openEditModal;
