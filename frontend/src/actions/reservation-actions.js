import axios from "axios";

import {
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAIL,
  MY_RESERVATIONS_REQUEST,
  MY_RESERVATIONS_SUCCESS,
  MY_RESERVATIONS_FAIL,
  ALL_RESERVATIONS_REQUEST,
  ALL_RESERVATIONS_SUCCESS,
  ALL_RESERVATIONS_FAIL,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_FAIL,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAIL,
  RESERVATION_DETAILS_REQUEST,
  RESERVATION_DETAILS_SUCCESS,
  RESERVATION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "./action-type";

export const createReservation = (reservation) => async (
  dispatch,
  getState
) => {
  console.log(reservation, "from action");
  try {
    dispatch({ type: CREATE_RESERVATION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/first-view/reservation/new",
      reservation,
      config
    );
    console.log(data);

    dispatch({
      type: CREATE_RESERVATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_RESERVATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get curretly logged in user reservations
export const myReservations = () => async (dispatch) => {
  try {
    dispatch({ type: MY_RESERVATIONS_REQUEST });

    const { data } = await axios.get("/api/first-view/reservations/me");

    dispatch({
      type: MY_RESERVATIONS_SUCCESS,
      payload: data.reservations,
    });
  } catch (error) {
    dispatch({
      type: MY_RESERVATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get reservation details
export const getReservationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESERVATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/first-view/reservation/${id}`);

    dispatch({
      type: RESERVATION_DETAILS_SUCCESS,
      payload: data.reservation,
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all reservations - ADMIN
export const allReservations = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESERVATIONS_REQUEST });

    const { data } = await axios.get(`/api/first-view/admin/allreservations`);

    dispatch({
      type: ALL_RESERVATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RESERVATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update reservation
export const updateReservation = (id, reservationData) => async (dispatch) => {
  console.log(reservationData);
  try {
    dispatch({ type: UPDATE_RESERVATION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/first-view/admin/reservation/${id}`,
      reservationData,
      config
    );

    dispatch({
      type: UPDATE_RESERVATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RESERVATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete reservation
export const deleteReservation = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RESERVATION_REQUEST });

    const { data } = await axios.delete(
      `/api/first-view/admin/reservation/${id}`
    );

    dispatch({
      type: DELETE_RESERVATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESERVATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
