import { ASC, DESC } from "../constants/index.js";

export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getCardFromModal = (data) => {
  return {
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
};

export const getSortedCards = (cards, sortType) => {
  const cloned = [...cards];

  if (sortType === DESC) {
    return cloned.sort(
      (a, b) => a.votes.up + a.votes.down - (b.votes.up + b.votes.down)
    );
  }

  if (sortType === ASC) {
    return cloned.sort(
      (a, b) => b.votes.up + b.votes.down - (a.votes.up + a.votes.down)
    );
  }

  return cloned.sort((a, b) => a.order - b.order);
};
