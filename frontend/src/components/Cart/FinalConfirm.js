import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReservation,
  clearErrors,
} from "../../actions/reservation-actions";

const FinalConfirm = ({ history }) => {
  const { error } = useSelector((state) => state.newReservation);
  const dispatch = useDispatch();

  const { cartItems, confirmingInfo } = useSelector((state) => state.cart);
  console.log("carta", cartItems);
  const reservationItems = cartItems;
  let ItemPrice = 0;
  cartItems.map((item) => (ItemPrice = ItemPrice + item.ItemPrice));
  const reservation = {
    reservationItems,
    confirmingInfo,
    ItemPrice,
  };
  console.log("reservation", reservation);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createReservation(reservation));
    alert("email is send to get your ticket from ");
    history.push("/success");
  };
  return (
    <div>
      <form className="shadow-lg" onSubmit={submitHandler}>
        <h1 className="mb-4">Confirming Info</h1>

        <div className="form-group">
          <label htmlFor="city_field"> write again you Cardpay</label>
          <input type="text" id="city_field" className="form-control" />
        </div>

        <button id="shipping_btn" type="submit" className="btn btn-block py-3">
          pay
        </button>
      </form>
    </div>
  );
};

export default FinalConfirm;
