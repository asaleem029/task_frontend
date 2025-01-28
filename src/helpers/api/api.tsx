import axios from 'axios';

import { BACKEND_SERVICES } from 'src/env/env';

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
  console.log(pageNo);
  return 0;
};

export const createTask = async (payload: any) => {
  console.log(payload)
};

export const updateTask = async (id: number, payload: any) => {
  console.log(id, payload);
};