import { useState } from 'react';
import type { Question } from '../types/Question';
import './QuestionOptions.css';

interface SingleChoiceProps {
    question: Question;
    userAnswer: string | null;
    onAnswer: (answer: string) => void;
    isChecked: boolean;
}

export default function SingleChoice({ question, userAnswer, onAnswer, isChecked }: SingleChoiceProps) {
    const [selected, setSelected] = useState<string>(userAnswer || '');

    const handleSelect = (answer: string) => {
        setSelected(answer);
        onAnswer(answer);
    };

    const isCorrect = selected === question.correctAnswers[0];

    return (
        <div className="options">
            {question.answers.map((answer, index) => {
                const isSelected = selected === answer;
                const isCorrectAnswer = question.correctAnswers[0] === answer;

                let className = 'option';
                if (isSelected) {
                    className += ' option--selected';
                }
                if (isChecked) {
                    if (isCorrectAnswer) {
                        className += ' option--correct';
                    } else if (isSelected && !isCorrectAnswer) {
                        className += ' option--incorrect';
                    }
                }

                return (
                    <label key={index} className={className}>
                        <input
                            type="radio"
                            name="single-choice"
                            value={answer}
                            checked={isSelected}
                            onChange={() => handleSelect(answer)}
                            disabled={isChecked}
                            className="option__input"
                        />
                        <span className="option__indicator">
              <span className="option__radio" />
            </span>
                        <span className="option__text">{answer}</span>
                        {isChecked && isCorrectAnswer && (
                            <span className="option__icon">✓</span>
                        )}
                        {isChecked && isSelected && !isCorrectAnswer && (
                            <span className="option__icon">✗</span>
                        )}
                    </label>
                );
            })}
        </div>
    );
}