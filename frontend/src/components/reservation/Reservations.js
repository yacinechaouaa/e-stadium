import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layaout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { myReservations, clearErrors } from "../../actions/reservation-actions";

const Reservations = () => {
  const dispatch = useDispatch();

  const { loading, error, reservations } = useSelector(
    (state) => state.myReservations
  );

  useEffect(() => {
    dispatch(myReservations());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setReservations = () => {
    const data = {
      columns: [
        {
          label: "Reservation ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of matchs",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "price Payed",
          field: "amount",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reservations.forEach((reservation) => {
      data.rows.push({
        id: reservation._id,
        numOfItems: reservation.reservationItems.length,
        amount: `$${reservation.ItemPrice}`,
        actions: (
          <Link
            to={`/reservation/${reservation._id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <h1 className="my-5">My Reservations</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setReservations()}
          className="px-3"
          breservationed
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default Reservations;
