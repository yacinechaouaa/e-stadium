import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layaout/Header";
import Footer from "./components/layaout/Footer";
import Home from "./components/Home";
import MatchDetails from "./components/match/MatchDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { Loaduser } from "./actions/user-actions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import MatchsList from "./components/admin/MatchsList";
import Dashboard from "./components/admin/Dashboard";
import NewMatech from "./components/admin/NewMatech";
import UsersList from "./components/admin/UsersList";
import Review from "./components/admin/Review";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdateUser from "./components/admin/UpdateUser";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import { store } from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateMatche from "./components/admin/UpdateMatche";
import Cart from "./components/Cart/Cart";
import Confirming from "./components/Cart/Confirming";
import FinalConfirm from "./components/Cart/FinalConfirm";
import Success from "./components/Cart/Success";
import Reservations from "./components/reservation/Reservations";
import ReservationsList from "./components/admin/ReservationsListe";
import ReservationCheck from "./components/admin/ReservationCheck";
import ReservationDetails from "./components/reservation/ReservationsDetails";
function App() {
  useEffect(() => {
    store.dispatch(Loaduser());
  }, []);
  const { user, isAuthtenticated, loading } = useSelector(
    (state) => state.auth
  );
  console.log(user, "from app");

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/match/:id" component={MatchDetails} exact />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/confirming" component={Confirming} exact />
        <ProtectedRoute path="/success" component={Success} exact />
        <ProtectedRoute
          path="/reservations/me"
          component={Reservations}
          exact
        />
        <ProtectedRoute
          path="/reservation/:id"
          component={ReservationDetails}
          exact
        />
        <ProtectedRoute path="/confirm" component={FinalConfirm} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute
          path="/admin/matchs"
          isAdmin={true}
          component={MatchsList}
          exact
        />
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/match"
          isAdmin={true}
          component={NewMatech}
          exact
        />{" "}
        <ProtectedRoute
          path="/admin/reservations"
          isAdmin={true}
          component={ReservationsList}
          exact
        />
        <ProtectedRoute
          path="/admin/reservation/:id"
          isAdmin={true}
          component={ReservationCheck}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/match/:id"
          isAdmin={true}
          component={UpdateMatche}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={Review}
          exact
        />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
        <ProtectedRoute
          path="/password/forgot"
          component={ForgotPassword}
          exact
        />
        {!loading && (!isAuthtenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
