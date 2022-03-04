import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import Loader from "../layaout/Loader";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  allReservations,
  deleteReservation,
  clearErrors,
} from "../../actions/reservation-actions";
import { DELETE_RESERVATION_RESET } from "../../actions/action-type";

const ReservationsList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, reservations } = useSelector(
    (state) => state.allReservations
  );
  console.log("hhhh", allReservations);
  const { isDeleted } = useSelector((state) => state.reservation);

  useEffect(() => {
    dispatch(allReservations());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Reservation deleted successfully");
      history.push("/admin/reservations");
      dispatch({ type: DELETE_RESERVATION_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deleteReservationHandler = (id) => {
    dispatch(deleteReservation(id));
  };

  const setReservations = () => {
    const data = {
      columns: [
        {
          label: "Reservation ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reservations.forEach((reservation) => {
      data.rows.push({
        id: reservation._id,
        numofItems: reservation.reservationItems.length,
        amount: `$${reservation.ItemPrice}`,
        actions: (
          <Fragment>
            <Link
              to={`/admin/reservation/${reservation._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteReservationHandler(reservation._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Reservations</h1>

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
        </div>
      </div>
    </Fragment>
  );
};

export default ReservationsList;
