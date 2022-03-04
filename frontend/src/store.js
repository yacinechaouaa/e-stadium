import { createStore, applyMiddleware, combineReducers } from "redux";

import {
  matchsReducer,
  matchDetailsReducer,
  matchReducer,
  newMatchReducer,
  newReviewReducer,
  matchReviewsReducer,
  reviewReducer,
} from "./Reducer/MatchReducer";
import {
  authReducer,
  allUsersReducer,
  userReducer,
  userDetailsReducer,
  forgotPassword,
} from "./Reducer/UserReducer";
import { cartReducer } from "./Reducer/cartReducers";
import {
  newReservationReducer,
  myReservationsReducer,
  reservationDetailsReducer,
  allReservationsReducer,
  reservationReducer,
} from "./Reducer/reservationReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const reducer = combineReducers({
  matchs: matchsReducer,
  match: matchReducer,
  matchDetail: matchDetailsReducer,
  matchReviews: matchReviewsReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  auth: authReducer,
  newMatch: newMatchReducer,
  allUsers: allUsersReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPassword,
  cart: cartReducer,
  newReservation: newReservationReducer,
  myReservations: myReservationsReducer,
  allReservations: allReservationsReducer,
  reservationDetails: reservationDetailsReducer,
  reservation: reservationReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    confirmingInfo: localStorage.getItem("confirmingInfo")
      ? JSON.parse(localStorage.getItem("confirmingInfo"))
      : {},
  },
};
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
