import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const TOTAL = 75 * 60;

export default function Timer() {
    const [time, setTime] = useState(TOTAL);

    useEffect(() => {
        const t = setInterval(() => setTime(t => t - 1), 1000);
        return () => clearInterval(t);
    }, []);

    const min = Math.floor(time / 60);
    const sec = time % 60;

    return (
        <Typography variant="h6" color={time < 300 ? 'error' : 'primary'}>
            ⏱ {min}:{sec.toString().padStart(2, '0')}
        </Typography>
    );
}