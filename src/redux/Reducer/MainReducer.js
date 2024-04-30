import { actionType } from "./../actionType";

const INIT_STATE = {
  recipes: [],
  user: null,
  save: JSON.parse(localStorage.getItem("save")) || [],
  modal: false,
  admin: ["sultanmamytbekov98@gmail.com", "llol39039@gmail.com" , "admin123@gmail.com"],
};

export const MainReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionType.GET_RECIPE:
      return { ...state, recipes: action.payload };
    case actionType.GET_USER:
      return { ...state, user: action.payload };
    case actionType.ADD_COUNT_ONE: {
      let data = [...state.save];
      data = data.map((el) => {
        if (el.id === action.payload) {
          return { ...el, count: (el.count += 1) };
        }
        return el;
      });
      localStorage.setItem("save", JSON.stringify(data));
      return { ...state, data };
    }
    case actionType.ADD_COUNT_TWE: {
      let data = [...state.save];
      data = data.map((el) => {
        if (el.id === action.payload) {
          return { ...el, count: (el.count -= el.count !== 1 ? 1 : 0) };
        }
        return el;
      });
      localStorage.setItem("save", JSON.stringify(data));
      return { ...state, data };
    }
    case actionType.ADD_SAVE:
      const fount = state.save.find((el) => el.id === action.payload.id);
      if (fount) {
        return {
          ...state,
          save: state.save.filter((el) => el.id !== action.payload.id),
        };
      }
      state.save.push(action.payload);
      return { ...state, save: state.save };
    case actionType.OPEN_CLOSE_MODAL:
      return { ...state, modal: action.payload };
    case actionType.BASKET_REMOVE: {
      localStorage.setItem("save", JSON.stringify(action.payload));
      return { ...state, save: action.payload };
    }
    default:
      return state;
  }
};
