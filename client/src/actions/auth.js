import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // const { result, token } = await api.signin(formData);

    // dispatch({ type: AUTH, data: { result, token } });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // const { result, token } = await api.signup(formData);

    // dispatch({ type: AUTH, data: { result, token } });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}