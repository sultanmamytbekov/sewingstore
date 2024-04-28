import { actionType } from "./../actionType";

export const addToSave = (card) => {
  let save = JSON.parse(localStorage.getItem("save")) || [];
  const fount = save.find((el) => el.id === card.id);
  if (fount) {
    save = save.filter((el) => el.id !== card.id);
    console.log(1);
  } else {
    save.push(card);
    console.log(2);
  }
  localStorage.setItem("save", JSON.stringify(save));
  return { type: actionType.ADD_SAVE, payload: card };
};
