import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Box, Card, Typography, Button } from '@mui/material';
import { useState } from 'react';
import type {Question} from '../types/Question';

function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MatchQuestion({ question, onAnswer }: { question: Question; onAnswer: (a: any) => void }) {
    const left = question.matchPairs.map(p => p.left);
    const right = shuffle(question.matchPairs.map(p => p.right));

    const [items, setItems] = useState(right);
    const [checked, setChecked] = useState(false);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [moved] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, moved);

        setItems(newItems);
    };

    const check = () => {
        const correct = question.matchPairs.map(p => p.right);
        const ok = JSON.stringify(items) === JSON.stringify(correct);

        setChecked(true);
        onAnswer(items);
        return ok;
    };

    return (
        <Box mt={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box display="flex" gap={2}>

                    {/* LEFT SIDE */}
                    <Box flex={1}>
                        {left.map(l => (
                            <Card key={l} sx={{ p: 1, mb: 1 }}>
                                <Typography>{l}</Typography>
                            </Card>
                        ))}
                    </Box>

                    {/* RIGHT SIDE */}
                    <Droppable droppableId="right">
                        {(provided) => (
                            <Box
                                flex={1}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {items.map((r, i) => (
                                    <Draggable key={r} draggableId={r} index={i}>
                                        {(provided) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{ p: 1, mb: 1, cursor: 'grab' }}
                                            >
                                                <Typography>{r}</Typography>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>

                </Box>
            </DragDropContext>

            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => check()}
            >
                Check
            </Button>

            {checked && (
                <Typography
                    sx={{ mt: 1 }}
                    color={JSON.stringify(items) === JSON.stringify(question.matchPairs.map(p => p.right)) ? 'green' : 'red'}
                >
                    {JSON.stringify(items) === JSON.stringify(question.matchPairs.map(p => p.right))
                        ? 'Correct!'
                        : 'Wrong!'}
                </Typography>
            )}

        </Box>
    );
}