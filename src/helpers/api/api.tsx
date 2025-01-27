import axios from 'axios';

import { BACKEND_SERVICES } from 'src/env/env';

export const fetchRolesList = async (pageNo: number) => {
  try {
    let response;
    if (pageNo === 0) {
      response = await axios.get(`${BACKEND_SERVICES.authService}/roles/super-admin?order=accessLevel:ASC`);
    } else {
      response = await axios.get(`${BACKEND_SERVICES.authService}/roles/super-admin?pageNo=${pageNo}&order=accessLevel:ASC`);
    }
    return response?.data || '';
  } catch (error) {
    console.error(error?.response?.data?.error?.message || 'An error occurred');
    return '';
  }
};

export const createRole = async (payload: any) => {
  const headers = {
    'user-external-id': 'df468ec9-7f2b-4b33-9c24-f541adc3e456',
  };
  const response = await axios.post(`${BACKEND_SERVICES.authService}/roles/`, payload, {
    headers,
  });
  return response.data;
};

export const updateRole = async (id: number, payload: any) => {
  const headers = {
    'user-external-id': 'df468ec9-7f2b-4b33-9c24-f541adc3e456',
  };
  const response = await axios.put(`${BACKEND_SERVICES.authService}/roles/${id}`, payload, {
    headers,
  });
  return response.data;
};