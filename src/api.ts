import axios from 'axios';
import { SalaryData } from './types';

const API_URL = 'http://localhost:5000/api/data/salaries';

export const fetchSalaries = async (): Promise<SalaryData[]> => {
  const response = await axios.get<SalaryData[]>(API_URL);
  return response.data;
};
