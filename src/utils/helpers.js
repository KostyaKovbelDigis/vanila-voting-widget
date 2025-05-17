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
