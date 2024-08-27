import axios from 'axios';

import { baseServerUrl } from '../constants/server';

const instance = axios.create({
  baseURL: baseServerUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: true,
});

export default function useApiClient() {
  return instance;
}
