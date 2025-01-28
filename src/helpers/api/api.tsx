import axios from 'axios';

import { BACKEND_SERVICES } from 'src/env/env';

import { readFromLocalStorage } from '../ReadAndWriteLocalStorage';

const user = readFromLocalStorage('user') // READ USER FROM LOCAL STORAGE
const userId = user?.id // GET USER ID
const token = readFromLocalStorage('token');
const headers = {
  Authorization: `${token}`,
}

// SIGN UP
export const signUp = async (payload: any) => {
  //  SIGN UP
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/auth/sign-up`, payload
  );
  // RETURN RESPONSE
  return response?.data ? response?.data : '';
};

// SIGN IN
export const signIn = async (payload: any) => {
  // SIGN IN
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/auth/sign-in`, payload
  );
  // RETURN RESPONSE
  return response?.data ? response?.data : '';
};

// FETCH TASKS LIST
export const fetchTasksList = async (pageNo: number) => {
  let response;
  if (pageNo === 0) {
    // FETCH TASKS LIST WITHOUT PAGINATION (FIRST PAGE) 
    response = await axios.get(`${BACKEND_SERVICES.authService}/task?order=id:ASC&userId=${userId}`, { headers });
  } else {
    // FETCH TASKS LIST WITH PAGINATION (NEXT PAGES)
    response = await axios.get(`${BACKEND_SERVICES.authService}/task?pageNo=${pageNo}&order=id:ASC&userId=${userId}`, { headers });
  }
  // RETURN RESPONSE
  return response?.data || '';
};

// CREATE TASK
export const createTask = async (payload: any) => {
  // CREATE TASK
  const response = await axios.post(
    `${BACKEND_SERVICES.authService}/task`, payload, { headers }
  );
  // RETURN RESPONSE
  return response?.data ? response?.data : '';
};

// UPDATE TASK
export const updateTask = async (id: number, payload: any) => {
  // UPDATE TASK
  payload = { userId, ...payload }
  const response = await axios.put(
    `${BACKEND_SERVICES.authService}/task/${id}`, payload, { headers }
  );
  // RETURN RESPONSE
  return response?.data ? response?.data : '';
};

// DELETE TASK
export const deleteTask = async (id: number) => {
  // UPDATE TASK
  const response = await axios.delete(
    `${BACKEND_SERVICES.authService}/task/${id}`, { headers }
  );
  // RETURN RESPONSE
  return response?.data ? response?.data : '';
};