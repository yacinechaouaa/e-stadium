import React, { Fragment, useState, useEffect } from "react";

import SideBar from "./SideBar";

import { useDispatch, useSelector } from "react-redux";
import {
  updateM,
  getMatchDetails,
  clearErrors,
} from "../../actions/matchs-actions";
import { UPDATE_MATCH_RESET } from "../../actions/action-type";

const UpdateMatche = ({ match, history }) => {
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["copa", "championsligue", "championnat"];

  const dispatch = useDispatch();

  const { error, Match } = useSelector((state) => state.matchDetail);
  const { loading, isUpdated } = useSelector((state) => state.match);
  const { user, isAuthtenticated } = useSelector((state) => state.auth);
  console.log(user, "from update");
  console.log(loading, "from update");
  const [name, setName] = useState(Match.name);
  const [price, setPrice] = useState(Match.price);
  const [description, setDescription] = useState(Match.description);
  const [categorie, setCategorie] = useState(Match.categorie);
  const [stock, setStock] = useState(Match.stock);
  const [time, setTime] = useState(Match.time);
  const [place, setPlace] = useState(Match.place);
  const matchId = match.params.id;

  useEffect(() => {
    if (Match && Match._id !== matchId) {
      dispatch(getMatchDetails(matchId));
    } else {
      setName(Match.name);
      setPrice(Match.price);
      setDescription(Match.description);
      setCategorie(Match.categorie);
      setStock(Match.stock);
      setTime(Match.time);
      setPlace(Match.place);
      setOldImages(Match.images);
    }

    if (isUpdated) {
      history.push("/admin/matchs");
      alert("Match updated successfully");
      dispatch({ type: UPDATE_MATCH_RESET });
    }
  }, [dispatch, isUpdated, history, match, matchId]);

  const submitHandler = (e) => {
    console.log("hhhhhhhhihih");
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("categorie", categorie);
    formData.set("stock", stock);
    formData.set("time", time);
    formData.set("place", place);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateM(Match._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <SideBar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Match</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">Place</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="description_field">Time</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">categorie</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                  >
                    {categories.map((categorie) => (
                      <option key={categorie} value={categorie}>
                        {categorie}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Ticket-Number</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateMatche;
