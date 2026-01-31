import './Result.css';

interface ResultProps {
    score: number;
    total: number;
    onRetry: () => void;
}

export default function Result({ score, total, onRetry }: ResultProps) {
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

    return (
        <div className="result">
            <div className="result__card">
                <div className={`result__icon ${passed ? 'result__icon--pass' : 'result__icon--fail'}`}>
                    {passed ? '🎉' : '📚'}
                </div>

                <h1 className="result__title">Exam Complete!</h1>

                <div className={`result__status ${passed ? 'result__status--pass' : 'result__status--fail'}`}>
                    {passed ? 'PASSED ✓' : 'FAILED ✗'}
                </div>

                <div className="result__score">
                    <div className="result__score-main">
                        <span className="result__score-value">{score}</span>
                        <span className="result__score-divider">/</span>
                        <span className="result__score-total">{total}</span>
                    </div>
                    <div className="result__percentage">{percentage}%</div>
                </div>

                <div className="result__message">
                    {passed ? (
                        <>
                            <p>Congratulations! You've passed the CCNA 2 v7.0 Final Exam.</p>
                            <p className="result__submessage">
                                You demonstrated strong understanding of networking concepts.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>You didn't pass this time, but don't give up!</p>
                            <p className="result__submessage">
                                Review the material and try again. You need 70% to pass.
                            </p>
                        </>
                    )}
                </div>

                <button className="result__retry-btn" onClick={onRetry}>
                    {passed ? 'Take Another Exam' : 'Retry Exam'}
                </button>

                <div className="result__footer">
                    <div className="result__stat">
                        <span className="result__stat-label">Correct Answers</span>
                        <span className="result__stat-value">{score}</span>
                    </div>
                    <div className="result__stat">
                        <span className="result__stat-label">Incorrect Answers</span>
                        <span className="result__stat-value">{total - score}</span>
                    </div>
                    <div className="result__stat">
                        <span className="result__stat-label">Pass Rate</span>
                        <span className="result__stat-value">70%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}