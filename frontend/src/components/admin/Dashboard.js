import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layaout/Loader";
import SideBar from "./SideBar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminMatchs } from "../../actions/matchs-actions";
import { allReservations } from "../../actions/reservation-actions";

import { allUsers } from "../../actions/user-actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, matchs } = useSelector((state) => state.matchs);
  console.log(matchs, "from dashbordcomponant");
  const { users } = useSelector((state) => state.allUsers);
  const { reservations, Total } = useSelector((state) => state.allReservations);

  /* const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { reservations, totalAmount, loading } = useSelector(
    (state) => state.allReservations
  );*/

  let outOfStock = 0;
  matchs.map((match) => {
    if (match.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminMatchs());
    dispatch(allUsers());
    dispatch(allReservations());
    /* dispatch(allReservations());
    dispatch(allUsers());*/
  }, [dispatch]);
  console.log(matchs, "from dahsbord");
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total
                        <br /> <b>${Total && Total.toFixed(2)}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Matchs
                        <br /> <b>{matchs && matchs.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/matchs"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Reservations
                        <br /> <b>{reservations && reservations.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/reservations"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        tickets complets <br /> <b>{outOfStock}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
