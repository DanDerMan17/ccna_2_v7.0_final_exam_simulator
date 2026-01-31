import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import type { Question } from '../types/Question';
import './MatchQuestion.css';

interface MatchQuestionProps {
    question: Question;
    userAnswer: string[] | null;
    onAnswer: (answers: string[]) => void;
    isChecked: boolean;
}

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function MatchQuestion({ question, userAnswer, onAnswer, isChecked }: MatchQuestionProps) {
    const leftItems = question.matchPairs.map((p) => p.left);
    const correctOrder = question.matchPairs.map((p) => p.right);

    // Right items pool
    const [rightItems, setRightItems] = useState<string[]>(
        userAnswer
            ? question.matchPairs
                .map((_, i) => userAnswer[i])
                .filter((x): x is string => !!x)
            : shuffle(correctOrder)
    );

    // Left assigned items
    const [assignedItems, setAssignedItems] = useState<(string | null)[]>(
        userAnswer && userAnswer.length === correctOrder.length
            ? userAnswer
            : Array(leftItems.length).fill(null)
    );

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || isChecked) return;

        const { source, destination, draggableId } = result;

        // Dragging within right column (reorder)
        if (source.droppableId === 'right-column' && destination.droppableId === 'right-column') {
            const items = Array.from(rightItems);
            const [moved] = items.splice(source.index, 1);
            items.splice(destination.index, 0, moved);
            setRightItems(items);
        }

        // Drag from right column to left slot
        if (source.droppableId === 'right-column' && destination.droppableId.startsWith('left-')) {
            const targetIndex = Number(destination.droppableId.split('-')[1]);

            const newAssigned = [...assignedItems];
            newAssigned[targetIndex] = draggableId;

            const newRightItems = rightItems.filter((item) => item !== draggableId);

            setAssignedItems(newAssigned);
            setRightItems(newRightItems);
            onAnswer(newAssigned);
        }

        // Drag back from left slot to right column
        if (source.droppableId.startsWith('left-') && destination.droppableId === 'right-column') {
            const sourceIndex = Number(source.droppableId.split('-')[1]);

            const newAssigned = [...assignedItems];
            const removed = newAssigned[sourceIndex];
            newAssigned[sourceIndex] = null;

            if (removed) {
                const newRightItems = Array.from(rightItems);
                newRightItems.splice(destination.index, 0, removed);
                setRightItems(newRightItems);
            }

            setAssignedItems(newAssigned);
            onAnswer(newAssigned);
        }
    };

    return (
        <div className="match">
            <div className="match__hint">Drag the items on the right to match with the left</div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="match__container">
                    {/* Left column - individual droppables */}
                    <div className="match__column">
                        <div className="match__header">Category</div>
                        {leftItems.map((item, index) => {
                            const assignedItem = assignedItems[index];
                            const isThisCorrect = isChecked && assignedItem === correctOrder[index];
                            const isThisIncorrect = isChecked && assignedItem && assignedItem !== correctOrder[index];

                            return (
                                <Droppable droppableId={`left-${index}`} key={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`match__item match__item--target ${
                                                snapshot.isDraggingOver ? 'match__item--active' : ''
                                            } ${isThisCorrect ? 'match__item--correct' : ''} ${
                                                isThisIncorrect ? 'match__item--incorrect' : ''
                                            }`}
                                        >
                                            <div className="match__number">{index + 1}</div>
                                            <div className="match__content">{item}</div>
                                            <div className="match__assigned">{assignedItem || 'Drop here'}</div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            );
                        })}
                    </div>

                    {/* Right column - draggable items */}
                    <Droppable droppableId="right-column" direction="vertical">
                        {(provided) => (
                            <div
                                className="match__column"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="match__header">Match</div>
                                {rightItems.map((item, index) => (
                                    <Draggable
                                        key={`${item}-${index}`}
                                        draggableId={item}
                                        index={index}
                                        isDragDisabled={isChecked}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`match__item match__item--draggable ${
                                                    snapshot.isDragging ? 'match__item--dragging' : ''
                                                }`}
                                            >
                                                <div className="match__drag">⋮⋮</div>
                                                <div className="match__content">{item}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}
