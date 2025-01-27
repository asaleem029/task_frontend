import axios from 'axios';

import { BACKEND_SERVICES } from 'src/env/env';

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