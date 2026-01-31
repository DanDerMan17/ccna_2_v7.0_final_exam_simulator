import './ProgressBar.css';

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = ((current + 1) / total) * 100;

    return (
        <div className="progress">
            <div className="progress__text">
                Question {current + 1} of {total}
            </div>
            <div className="progress__bar">
                <div
                    className="progress__fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="progress__percent">{Math.round(percentage)}%</div>
        </div>
    );
}