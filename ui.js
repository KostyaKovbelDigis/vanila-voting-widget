import useAppState from "./state.js";
import openEditModal from "./modal.js";

export const renderControls = () => {
  const bar = document.createElement("div");
  bar.id = "controls";

  bar.innerHTML = `
    <button class="reset-btn">Reset</button>
    <button class="add-btn">Add</button>
  `;

  bar.querySelector(".reset-btn").onclick = () => {
    useAppState.reset();
    renderCards(useAppState.get());
  };

  bar.querySelector(".add-btn").onclick = () =>
    openEditModal({
      title: "",
      description: "",
      image: "",
      votes: { up: 0, down: 0 },
      button: { label: "Learn More", url: "#" },
    });

  document.body.prepend(bar);
};

export const renderCards = (data) => {
  const existing = document.getElementById("cards-container");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "cards-container";

  data.forEach((item) => {
    const card = createCardComponent(item);
    container.appendChild(card);
  });

  document.body.appendChild(container);
};
const createCardComponent = (data) => {
  const card = document.createElement("div");
  card.className = "card";

  const imageHTML = data.image
    ? `<img src="${data.image}" alt="${data.title}" />`
    : `<div class="no-photo">No Photo</div>`;

  card.innerHTML = `
    ${imageHTML}
    <div class="card-content">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <div class="votes">
        <button class="upvote">👍 <span>${data.votes.up}</span></button>
        <button class="downvote">👎 <span>${data.votes.down}</span></button>
      </div>
      <a href="${data.button.url}" target="_blank" class="action-btn">${data.button.label}</a>
      <div class="edit-delete-row">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;

  card.querySelector(".upvote").onclick = () => updateVote(data.id, "up");
  card.querySelector(".downvote").onclick = () => updateVote(data.id, "down");
  card.querySelector(".edit-btn").onclick = () => openEditModal(data);
  card.querySelector(".delete-btn").onclick = () => {
    useAppState.deleteById(data.id);
    renderCards(useAppState.get());
  };

  return card;
};

const updateVote = (id, type) => {
  const current = useAppState.get();
  const updated = current.map((card) =>
    card.id === id
      ? { ...card, votes: { ...card.votes, [type]: card.votes[type] + 1 } }
      : card
  );
  useAppState.set(updated);
  renderCards(updated);
};
