import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layaout/Loader";
import { getMatchDetails, newReview } from "../../actions/matchs-actions";
import { Carousel } from "react-bootstrap";
import { NEW_REVIEW_RESET } from "../../actions/action-type";
import ReviewsList from "./ReviewsList";
import { addItemToCart } from "../../actions/card-actions";

const MatchDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { Match, loading } = useSelector((state) => state.matchDetail);
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchDetails(match.params.id));
    if (reviewError) {
      alert.error(reviewError);
    }

    if (success) {
      alert("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, []);
  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert("Item Added to Cart");
  };

  console.log("this match ", Match);
  console.log(Match.images);
  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("matchId", match.params.id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {Match.images &&
                  Match.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img src={image.url} className="d-block w-100" />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{Match.name}</h3>
              <p id="product_id">Match # {Match._id}</p>
              <hr />
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(match.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">{Match.reviwNumber} reviews</span>
              <hr />
              <p id="product_price">${Match.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value="1"
                  readOnly
                />

                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={Match.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <hr />
              <p>
                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={Match.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {Match.stock > 0 ? "available" : "not available"}
                  </span>
                </p>
              </p>
              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{Match.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Number of tickets : <strong>{Match.stock}</strong>
              </p>
              <p id="product_seller mb-3">
                match Time : <strong>{Match.time}</strong>
              </p>
              <p id="product_seller mb-3">
                match stadium : <strong>{Match.place}</strong>
              </p>
              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Match.reviews && Match.reviews.length > 0 && (
            <ReviewsList reviews={Match.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
// mazel bech nzid in stock w out of stock don"t forget

export default MatchDetails;
