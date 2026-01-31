import { useEffect, useState } from 'react';
import { fetchQuestions } from '../api/questions';
import type { Question } from '../types/Question';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import SingleChoice from '../components/SingleChoice';
import MultipleChoice from '../components/MultipleChoice';
import MatchQuestion from '../components/MatchQuestion';
import Result from './Result';
import './Exam.css';

export default function Exam() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set());
    const [isFinished, setIsFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadQuestions = async () => {
        setIsLoading(true);
        try {
            const data = await fetchQuestions();
            // Shuffle and select 60 random questions
            const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 60);
            setQuestions(shuffled);
            setAnswers({});
            setCheckedQuestions(new Set());
            setCurrentIndex(0);
            setIsFinished(false);
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('Failed to load questions. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    if (isLoading) {
        return (
            <div className="exam__loading">
                <div className="exam__spinner" />
                <p>Loading exam questions...</p>
            </div>
        );
    }

    if (isFinished) {
        const score = calculateScore();
        return <Result score={score} total={questions.length} onRetry={loadQuestions} />;
    }

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) {
        return (
            <div className="exam__loading">
                <p>No questions available</p>
            </div>
        );
    }

    const handleAnswer = (answer: any) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion._id]: answer,
        }));
    };

    const handleCheck = () => {
        setCheckedQuestions((prev) => new Set(prev).add(currentQuestion._id));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleFinish = () => {
        const unanswered = questions.filter((q) => !answers[q._id]);
        if (unanswered.length > 0) {
            const confirm = window.confirm(
                `You have ${unanswered.length} unanswered question(s). Are you sure you want to finish?`
            );
            if (!confirm) return;
        }
        setIsFinished(true);
    };

    const isChecked = checkedQuestions.has(currentQuestion._id);
    const hasAnswer = Boolean(answers[currentQuestion._id]);

    function calculateScore(): number {
        return questions.reduce((score, question) => {
            const answer = answers[question._id];
            if (!answer) return score;

            if (question.type === 'single') {
                return score + (answer === question.correctAnswers[0] ? 1 : 0);
            }

            if (question.type === 'multiple') {
                const correct = new Set(question.correctAnswers);
                const selected = new Set(answer);
                const isCorrect =
                    correct.size === selected.size &&
                    [...correct].every((a) => selected.has(a));
                return score + (isCorrect ? 1 : 0);
            }

            if (question.type === 'match') {
                const correctOrder = question.matchPairs.map((p) => p.right);
                const isCorrect = JSON.stringify(answer) === JSON.stringify(correctOrder);
                return score + (isCorrect ? 1 : 0);
            }

            return score;
        }, 0);
    }

    return (
        <div className="exam">
            <header className="exam__header">
                <div className="exam__header-content">
                    <h1 className="exam__title">CCNA 2 v7.0 Final Exam</h1>
                    <Timer />
                </div>
                <ProgressBar current={currentIndex} total={questions.length} />
            </header>

            <main className="exam__main">
                <div className="exam__card">
                    <div className="exam__question-header">
                        <span className="exam__question-number">Question {currentIndex + 1}</span>
                        <span className="exam__question-type">
              {currentQuestion.type === 'single' && '(Single Choice)'}
                            {currentQuestion.type === 'multiple' && '(Multiple Choice)'}
                            {currentQuestion.type === 'match' && '(Match Items)'}
            </span>
                    </div>

                    <h2 className="exam__question-text">{currentQuestion.question}</h2>

                    {currentQuestion.image && (
                        <div className="exam__image">
                            <img src={currentQuestion.image} alt="Question diagram" />
                        </div>
                    )}

                    {currentQuestion.type === 'single' && (
                        <SingleChoice
                            question={currentQuestion}
                            userAnswer={answers[currentQuestion._id] || null}
                            onAnswer={handleAnswer}
                            isChecked={isChecked}
                        />
                    )}

                    {currentQuestion.type === 'multiple' && (
                        <MultipleChoice
                            question={currentQuestion}
                            userAnswer={answers[currentQuestion._id] || null}
                            onAnswer={handleAnswer}
                            isChecked={isChecked}
                        />
                    )}

                    {currentQuestion.type === 'match' && (
                        <MatchQuestion
                            question={currentQuestion}
                            userAnswer={answers[currentQuestion._id] || null}
                            onAnswer={handleAnswer}
                            isChecked={isChecked}
                        />
                    )}

                    {hasAnswer && !isChecked && (
                        <button className="exam__check-btn" onClick={handleCheck}>
                            Check Answer
                        </button>
                    )}

                    <div className="exam__navigation">
                        <button
                            className="exam__nav-btn exam__nav-btn--secondary"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>

                        <div className="exam__nav-info">
                            {hasAnswer ? (
                                <span className="exam__answered">✓ Answered</span>
                            ) : (
                                <span className="exam__unanswered">Not answered</span>
                            )}
                        </div>

                        {currentIndex < questions.length - 1 ? (
                            <button className="exam__nav-btn exam__nav-btn--primary" onClick={handleNext}>
                                Next →
                            </button>
                        ) : (
                            <button className="exam__nav-btn exam__nav-btn--finish" onClick={handleFinish}>
                                Finish Exam
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}