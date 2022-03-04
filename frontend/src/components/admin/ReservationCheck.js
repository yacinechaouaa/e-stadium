import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layaout/Loader";
import SideBar from "./SideBar";

import { useDispatch, useSelector } from "react-redux";
import {
  getReservationDetails,
  updateReservation,
  clearErrors,
} from "../../actions/reservation-actions";
const ReservationCheck = ({ match }) => {
  const dispatch = useDispatch();

  const { loading, reservation = {} } = useSelector(
    (state) => state.reservationDetails
  );
  let {
    confirmingInfo,
    reservationItems,

    user,
    ItemPrice,
    checkin,
  } = reservation;
  const { error, isUpdated } = useSelector((state) => state.reservation);

  const reservationId = match.params.id;

  useEffect(() => {
    dispatch(getReservationDetails(reservationId));

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isUpdated, reservationId]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 reservation-details">
                  <h2 className="my-5">Reservation # {reservation._id}</h2>

                  <h4 className="mb-4"> paymentInfo Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {confirmingInfo && confirmingInfo.phoneNo}
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
                            <Link to={`/match/${item.match}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p> ItemPrice : ${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Ticket(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <div className="form-group"></div>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ReservationCheck;
