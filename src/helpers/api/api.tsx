import axios from 'axios';

import { BACKEND_SERVICES } from 'src/env/env';
import { readFromLocalStorage } from '../ReadAndWriteLocalStorage';

const user = readFromLocalStorage('user')
const userId = user?.id

export const signUp = async (payload: any) => {
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/auth/sign-up`, payload
  );
  return response?.data ? response?.data : '';
};

export const signIn = async (payload: any) => {
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/auth/sign-in`, payload
  );
  return response?.data ? response?.data : '';
};

export const fetchTasksList = async (pageNo: number) => {
  let response;
  if (pageNo === 0) {
    response = await axios.get(`${BACKEND_SERVICES.authService}/task?order=id:ASC&userId=${userId}`);
  } else {
    response = await axios.get(`${BACKEND_SERVICES.authService}/task?pageNo=${pageNo}&order=id:ASC&userId=${userId}`);
  }
  return response?.data || '';
};

export const createTask = async (payload: any) => {
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/task`, payload
  );
  return response?.data ? response?.data : '';
};

export const updateTask = async (id: number, payload: any) => {
  console.log(id, payload);
};