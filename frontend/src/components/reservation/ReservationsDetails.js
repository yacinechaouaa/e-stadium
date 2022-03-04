import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layaout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getReservationDetails } from "../../actions/reservation-actions";

const ReservationDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, error, reservation = {} } = useSelector(
    (state) => state.reservationDetails
  );
  const {
    confirmingInfo,
    reservationItems,

    user,
    ItemPrice,
  } = reservation;

  useEffect(() => {
    dispatch(getReservationDetails(match.params.id));

    if (error) {
      alert(error);
    }
  }, [dispatch, alert, error, match.params.id]);

  const confirmingDetails =
    confirmingInfo &&
    `${confirmingInfo.cardPay}, ${confirmingInfo.identityCard}, `;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Reservation # {reservation._id}</h1>

              <h4 className="mb-4">Confirming Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {confirmingInfo && confirmingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>cards number :</b>
                {confirmingDetails}
              </p>
              <p>
                <b>price payed :</b> ${ItemPrice}
              </p>

              <hr />

              <h4 className="my-4">Reservation Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {reservationItems &&
                  reservationItems.map((item) => (
                    <div key={item.match} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/match/${item.match}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReservationDetails;
