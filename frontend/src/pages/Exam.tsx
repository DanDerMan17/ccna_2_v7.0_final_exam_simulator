import { useEffect, useState } from 'react';
import { fetchQuestions } from '../api/questions';
import type {Question} from '../types/Question';
import { Box, Button, Card, Typography } from '@mui/material';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchQuestion from '../components/MatchQuestion';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import Result from './Result';

export default function Exam() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [finished, setFinished] = useState(false);

    const load = async () => {
        const data = await fetchQuestions();
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 60);

        setQuestions(shuffled);
        setAnswers({});
        setCurrent(0);
        setFinished(false);
    };

    useEffect(() => { load(); }, []);

    if (finished) {
        const score = questions.reduce((sum, q) => {
            const a = answers[q._id];
            if (!a) return sum;

            if (q.type === 'single') return sum + (a === q.correctAnswers[0] ? 1 : 0);

            if (q.type === 'multiple')
                return sum + (JSON.stringify([...a].sort()) === JSON.stringify([...q.correctAnswers].sort()) ? 1 : 0);

            if (q.type === 'match')
                return sum + (JSON.stringify(a) === JSON.stringify(q.matchPairs.map(p => p.right)) ? 1 : 0);

            return sum;
        }, 0);

        return <Result score={score} total={questions.length} onRetry={load} />;
    }

    const q = questions[current];
    if (!q) return <div>Loading...</div>;

    return (
        <Box p={3}>
            <Timer />
            <ProgressBar current={current} total={60} />

            <Card sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6">{current + 1}. {q.question}</Typography>

                {q.image && (
                    <img src={`http://localhost:3000/images/${q.image}`} style={{ maxWidth: '100%', marginTop: 12 }} />
                )}

                {q.type === 'single' && <SingleChoice question={q} onAnswer={a => setAnswers({ ...answers, [q._id]: a })} />}
                {q.type === 'multiple' && <MultipleChoice question={q} onAnswer={a => setAnswers({ ...answers, [q._id]: a })} />}
                {q.type === 'match' && <MatchQuestion question={q} onAnswer={a => setAnswers({ ...answers, [q._id]: a })} />}

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>Back</Button>

                    {current < 59 ? (
                        <Button variant="contained" onClick={() => setCurrent(c => c + 1)}>Next</Button>
                    ) : (
                        <Button variant="contained" color="success" onClick={() => setFinished(true)}>Finish Exam</Button>
                    )}
                </Box>
            </Card>
        </Box>
    );
}