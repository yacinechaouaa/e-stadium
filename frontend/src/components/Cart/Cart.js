import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/card-actions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const [type, setType] = useState("");
  const types = ["virage", "pelouse", "enceinte"];

  const { cartItems } = useSelector((state) => state.cart);
  console.log(type, "before inrease");
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(type, "from increase");
    /*  if (type == "pelouse") {
      count1 = count1 + newQty;
    }
    if (type == "virage") {
      count2 = count2 + newQty;
    }
    if (type == "enceinte") {
      count3 = count3 + newQty;
    } 

    if (count1 > stock / 3) return;
    if (count2 > stock / 3) return;
    if (count3 > stock / 3) return; */
    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty, type));
  };

  const decreaseQty = (id, quantity, type) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty, type));
  };

  const checkoutHandler = () => {
    if (user) {
      history.push("/confirming");
    } else {
      history.push("/login");
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <h2 className="mt-5">No Match to book</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            you tag : <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment>
                  <hr />

                  <div className="cart-item" key={item.match}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/matchs/${item.match}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.match, item.quantity, type)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.match,
                                item.quantity,
                                item.stock,
                                type
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            marginTop: "20px",
                          }}
                        >
                          <label
                            htmlFor="country_field"
                            style={{ marginRight: "10px" }}
                          >
                            <h2> seat</h2>
                          </label>
                          <select
                            id="country_field"
                            className="form-control"
                            required
                            onChange={(e) => setType(e.target.value)}
                          >
                            {types.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.match)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>reservation Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  reserve this matchs
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
