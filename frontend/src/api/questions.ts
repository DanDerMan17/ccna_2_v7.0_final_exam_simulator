import axios from 'axios';
import type { Question } from '../types/Question';

const API_BASE = 'http://localhost:3000/api';

export async function fetchQuestions(): Promise<Question[]> {
    const response = await axios.get<Question[]>(`${API_BASE}/questions`);
    return response.data;
}