import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Success = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src={user.avatar.url}
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your reservation has been placed successfully.</h2>
          <h3> you have got a message containing your ticket on your email </h3>

          <Link to="/reservations/me">Go to Reservations</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Success;
