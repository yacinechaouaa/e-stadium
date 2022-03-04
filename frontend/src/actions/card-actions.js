import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_CONFIRMING_INFO,
} from "./action-type";

export const addItemToCart = (id, quantity, type) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/first-view/match/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      match: data.thismatch._id,
      name: data.thismatch.name,
      price: data.thismatch.price,
      image: data.thismatch.images[0].url,
      stock: data.thismatch.stock,
      ItemPrice: data.thismatch.price * quantity,
      quantity,
      type,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const saveConfirmingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_CONFIRMING_INFO,
    payload: data,
  });

  localStorage.setItem("confirmingInfo", JSON.stringify(data));
};
