import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_CONFIRMING_INFO,
} from "../actions/action-type";

export const cartReducer = (
  state = { cartItems: [], confirmingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.match === item.match);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.match === isItemExist.match ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.match !== action.payload),
      };

    case SAVE_CONFIRMING_INFO:
      return {
        ...state,
        confirmingInfo: action.payload,
      };

    default:
      return state;
  }
};
