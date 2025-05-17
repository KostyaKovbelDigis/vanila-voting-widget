export const getNormalizedCard = (card, index) => ({
  ...card,
  id: index + 1,
  order: index,
  votes: card.votes || { up: 0, down: 0 },
});

export const getData = async () => {
  try {
    const res = await fetch("https://my.beastscan.com/test-kit");

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const json = await res.json();

    if (!Array.isArray(json)) {
      throw new Error("Invalid data format");
    }

    return json.map(getNormalizedCard);
  } catch (error) {
    alert("🚨 Failed to load data: " + error.message);
    return null;
  }
};
