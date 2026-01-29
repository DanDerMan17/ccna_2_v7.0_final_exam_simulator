import axios from 'axios';
import type {Question} from '../types/Question';


const API = 'http://localhost:3000/api/questions';


export async function fetchQuestions(): Promise<Question[]> {
    const res = await axios.get<Question[]>(API);
    return res.data;
}