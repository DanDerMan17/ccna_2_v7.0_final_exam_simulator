import { useState } from 'react';
import type { Question } from '../types/Question';
import './QuestionOptions.css';

interface MultipleChoiceProps {
    question: Question;
    userAnswer: string[] | null;
    onAnswer: (answers: string[]) => void;
    isChecked: boolean;
}

export default function MultipleChoice({ question, userAnswer, onAnswer, isChecked }: MultipleChoiceProps) {
    const [selected, setSelected] = useState<string[]>(userAnswer || []);

    const handleToggle = (answer: string) => {
        const newSelected = selected.includes(answer)
            ? selected.filter((a) => a !== answer)
            : [...selected, answer];

        setSelected(newSelected);
        onAnswer(newSelected);
    };

    const correctSet = new Set(question.correctAnswers);
    const selectedSet = new Set(selected);
    const isFullyCorrect =
        correctSet.size === selectedSet.size &&
        [...correctSet].every((a) => selectedSet.has(a));

    return (
        <div className="options">
            <div className="options__hint">Select all that apply</div>
            {question.answers.map((answer, index) => {
                const isSelected = selected.includes(answer);
                const isCorrectAnswer = correctSet.has(answer);

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
                            type="checkbox"
                            value={answer}
                            checked={isSelected}
                            onChange={() => handleToggle(answer)}
                            disabled={isChecked}
                            className="option__input"
                        />
                        <span className="option__indicator">
              <span className="option__checkbox">
                {isSelected && '✓'}
              </span>
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