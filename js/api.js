// creating id for this cards, cause we dont recieve one from api
export const normalizeCard = (card, index) => ({
    ...card,
    id: index + 1,
    votes: card.votes || { up: 0, down: 0 },
  });
  
  export const getData = async () => {
    const res = await fetch("https://my.beastscan.com/test-kit");
    const json = await res.json();
    return json.map(normalizeCard);
  };
  