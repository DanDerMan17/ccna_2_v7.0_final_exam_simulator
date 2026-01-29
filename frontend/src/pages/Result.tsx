import { Box, Button, Card, Typography } from '@mui/material';

export default function Result({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
    const percent = Math.round((score / total) * 100);
    const passed = percent >= 70;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Card sx={{ p: 4, width: 400, textAlign: 'center' }}>
                <Typography variant="h4">Exam Result</Typography>

                <Typography variant="h5" sx={{ mt: 2 }} color={passed ? 'green' : 'red'}>
                    {passed ? 'PASS ✅' : 'FAIL ❌'}
                </Typography>

                <Typography variant="h6" sx={{ mt: 1 }}>
                    Score: {score}/{total} ({percent}%)
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={onRetry}
                >
                    Retry Exam
                </Button>
            </Card>
        </Box>
    );
}