import { useEffect, useState } from 'react';
import './Timer.css';

const TOTAL_SECONDS = 75 * 60; // 75 minutes

export default function Timer() {
    const [seconds, setSeconds] = useState(TOTAL_SECONDS);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const isLowTime = seconds < 300; // Less than 5 minutes

    return (
        <div className={`timer ${isLowTime ? 'timer--warning' : ''}`}>
            <span className="timer__icon">⏱</span>
            <span className="timer__time">
        {minutes.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
        </div>
    );
}