import React, { Fragment, useState } from "react";

/*import CheckoutSteps from "./CheckoutSteps";*/

import { useDispatch, useSelector } from "react-redux";
import { saveConfirmingInfo } from "../../actions/card-actions";
import {
  createReservation,
  clearErrors,
} from "../../actions/reservation-actions";

const Confirming = ({ history }) => {
  const { cartItems, confirmingInfo } = useSelector((state) => state.cart);
  console.log(cartItems);

  const [identityCard, setIdentityCard] = useState(confirmingInfo.identityCard);
  const [cardPay, setCardPay] = useState(confirmingInfo.cardPay);
  const [phoneNo, setPhoneNo] = useState(confirmingInfo.phoneNo);

  /*     identityCard: {
      type: String,
      required: true,
    },
    cardPay: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
 */
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveConfirmingInfo({ phoneNo, cardPay, identityCard }));
    history.push("/confirm");
  };

  return (
    <Fragment>
      {/*   <CheckoutSteps confirming /> */}

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Confirming Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">IdentityCard</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                onChange={(e) => setIdentityCard(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Cardpay</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                onChange={(e) => setCardPay(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                required
              />
            </div>

            {/*  <div className="form-group">
              <label htmlFor="country_field">ticket-type</label>
              <select id="country_field" className="form-control" required>
                <option> virage </option>
                <option> pelouse </option>
                <option> enceinte </option>
              </select>
            </div>*/}

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Confirming;
