import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { useState } from 'react';
import type {Question} from '../types/Question';


export default function SingleChoice({ question, onAnswer }: { question: Question, onAnswer: (a: string) => void }) {
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);


    const isCorrect = value === question.correctAnswers[0];


    return (
        <>
            <RadioGroup value={value} onChange={e => setValue(e.target.value)}>
                {question.answers.map(a => (
                    <FormControlLabel key={a} value={a} control={<Radio />} label={a} />
                ))}
            </RadioGroup>


            <Button
                variant="outlined"
                onClick={() => { setChecked(true); onAnswer(value); }}
                sx={{ mt: 1, color: checked ? (isCorrect ? 'green' : 'red') : undefined }}
            >
                Check
            </Button>
        </>
    );
}