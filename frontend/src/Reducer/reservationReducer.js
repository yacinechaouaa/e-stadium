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
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_RESET,
  UPDATE_RESERVATION_FAIL,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_RESET,
  DELETE_RESERVATION_FAIL,
  RESERVATION_DETAILS_REQUEST,
  RESERVATION_DETAILS_SUCCESS,
  RESERVATION_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../actions/action-type";

export const newReservationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_RESERVATION_SUCCESS:
      return {
        loading: false,
        reservation: action.payload,
      };

    case CREATE_RESERVATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myReservationsReducer = (state = { reservations: [] }, action) => {
  switch (action.type) {
    case MY_RESERVATIONS_REQUEST:
      return {
        loading: true,
      };

    case MY_RESERVATIONS_SUCCESS:
      return {
        loading: false,
        reservations: action.payload,
      };

    case MY_RESERVATIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reservationDetailsReducer = (
  state = { reservation: {} },
  action
) => {
  switch (action.type) {
    case RESERVATION_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case RESERVATION_DETAILS_SUCCESS:
      return {
        loading: false,
        reservation: action.payload,
      };

    case RESERVATION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allReservationsReducer = (
  state = { reservations: [] },
  action
) => {
  switch (action.type) {
    case ALL_RESERVATIONS_REQUEST:
      return {
        loading: true,
      };

    case ALL_RESERVATIONS_SUCCESS:
      return {
        loading: false,
        reservations: action.payload.reservations,
        Total: action.payload.Total,
      };

    case ALL_RESERVATIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reservationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RESERVATION_REQUEST:
    case DELETE_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_RESERVATION_FAIL:
    case DELETE_RESERVATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_RESERVATION_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_RESERVATION_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
