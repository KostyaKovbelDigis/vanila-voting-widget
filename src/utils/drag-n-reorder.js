let draggedCard = null;

export function handleDragStart(e) {
  draggedCard = e.target.closest(".card");
  e.target.classList.add("dragging");
}

export function handleDragEnd(e) {
  e.target.classList.remove("dragging");

  document
    .querySelectorAll(".card")
    .forEach((card) => card.classList.remove("drag-over"));

  draggedCard = null;
}

export function handleDragOver(e) {
  e.preventDefault();
}

export function handleDragEnter(e) {
  const target = e.target.closest(".card");
  if (!target || target === draggedCard) return;

  document
    .querySelectorAll(".card")
    .forEach((card) => card.classList.remove("drag-over"));

  target.classList.add("drag-over");
}

export function handleDragLeave(e) {
  const target = e.target.closest(".card");
  if (!target) return;

  const rect = target.getBoundingClientRect();
  if (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  ) {
    return;
  }

  target.classList.remove("drag-over");
}

export function handleDrop(e) {
  e.preventDefault();

  const container = document.getElementById("cards-container");
  const target = container.querySelector(".card.drag-over");

  if (!target || target === draggedCard) return;

  const draggedIndex = [...container.children].indexOf(draggedCard);
  const targetIndex = [...container.children].indexOf(target);

  if (draggedIndex < targetIndex) {
    container.insertBefore(draggedCard, target.nextSibling);
  } else {
    container.insertBefore(draggedCard, target);
  }

  target.classList.remove("drag-over");
}
