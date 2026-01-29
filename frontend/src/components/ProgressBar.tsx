import { LinearProgress, Typography } from '@mui/material';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <>
            <Typography>Progress: {current + 1}/{total}</Typography>
            <LinearProgress variant="determinate" value={((current + 1) / total) * 100} />
        </>
    );
}