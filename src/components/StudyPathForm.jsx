import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
    Card,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Box
} from '@mui/material';
import SuggestionService from "../services/SuggestionService.js";
import StreamResultDialog from "./StreamResultDialog.jsx";

const questions = [
    {
        id: 1,
        text: "Are you fascinated by scientific theories and experiments?"
    },
    {
        id: 2,
        text: "Do you enjoy subjects like biology, chemistry, or physics?"
    },
    {
        id: 3,
        text: "Do you find economics and understanding how businesses operate interesting?"
    },
    {
        id: 4,
        text: "Are you curious about finance, accounting, or stock markets?"
    },
    {
        id: 5,
        text: "Are you inclined toward subjects like history, literature, or sociology?"
    },
    {
        id: 6,
        text: "Do you enjoy creative writing, poetry, or analyzing literature?"
    },
    {
        id: 7,
        text: "Are you interested in electronics, electrical circuits, and how machines work?",
    },
    {
        id: 8,
        text: "Do you enjoy practical laboratory work and applying scientific concepts to real-world engineering problems?",
    }
];

const StudyPathForm = () => {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const {control, handleSubmit, reset} = useForm({
        defaultValues: questions.reduce((acc, q) => ({
            ...acc,
            [`question${q.id}`]: ''
        }), {})
    });

    const onSubmit = async (data) => {
        const userResponseStreams = Object.entries(data).map(([key, value]) => ({
            questionId: parseInt(key.replace('question', '')),
            answer: value === 'yes' ? 'Y' : 'N'
        }));

        const requestBody = {
            userResponseStreams
        };
        console.log('Sending request:', requestBody);

        try {
            const response = await SuggestionService.suggestStream(requestBody);
            console.log("response : ", response);
            setResponse(response);
            setOpen(true);
        } catch (e) {
            console.error('Error:', e);
        }

    };

    return (
        <Card sx={{backgroundColor: '#F3F3F3', p: 2, overflow: 'auto', maxHeight: 600, scrollbarWidth: 'none'}}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
                    <Typography sx={{fontSize: 22, fontWeight: 600, textAlign: 'center', maxWidth: 500}}>
                        Discover Your Ideal Study Path with EduGuide
                    </Typography>
                    <Typography
                        sx={{fontSize: 16, fontWeight: 500, color: '#757575', textAlign: 'center', maxWidth: 800}}>
                        Answer a few questions to discover the study stream that aligns with
                        your interests and goals. Let EduGuide guide you to the perfect
                        academic path!
                    </Typography>
                </Box>

                <Box m={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {questions?.map((question) => (
                                <FormControl key={question.id} sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    gap: 2
                                }}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            backgroundColor: '#1976d2',
                                            mt: 1
                                        }}
                                    />
                                    <Box sx={{flex: 1}}>
                                        <FormLabel sx={{color: 'black'}}>{question.text}</FormLabel>
                                        <Controller
                                            name={`question${question.id}`}
                                            control={control}
                                            rules={{required: true}}
                                            render={({field}) => (
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                >
                                                    <FormControlLabel
                                                        value="yes"
                                                        control={<Radio/>}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        value="no"
                                                        control={<Radio/>}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            )}
                                        />
                                    </Box>
                                </FormControl>
                            ))}

                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{backgroundColor: '#7095DE'}}
                                >
                                    SUBMIT
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>

            </CardContent>
            <StreamResultDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    reset()
                }}
                response={response}
            />
        </Card>
    );
};

export default StudyPathForm;