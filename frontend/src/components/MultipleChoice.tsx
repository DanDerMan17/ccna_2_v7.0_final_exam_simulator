import { Checkbox, FormControlLabel, Button } from '@mui/material';
import { useState } from 'react';
import type {Question} from '../types/Question';


export default function MultipleChoice({ question, onAnswer }: { question: Question, onAnswer: (a: string[]) => void }) {
    const [values, setValues] = useState<string[]>([]);
    const [checked, setChecked] = useState(false);


    const toggle = (v: string) => {
        setValues(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
    };


    const isCorrect = JSON.stringify([...values].sort()) === JSON.stringify([...question.correctAnswers].sort());


    return (
        <>
            {question.answers.map(a => (
                <FormControlLabel
                    key={a}
                    control={<Checkbox checked={values.includes(a)} onChange={() => toggle(a)} />}
                    label={a}
                />
            ))}


            <Button
                variant="outlined"
                onClick={() => { setChecked(true); onAnswer(values); }}
                sx={{ mt: 1, color: checked ? (isCorrect ? 'green' : 'red') : undefined }}
            >
                Check
            </Button>
        </>
    );
}