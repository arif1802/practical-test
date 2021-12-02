import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, useFieldArray } from "react-hook-form";
import { fetchForm, saveSurvey } from '../../Redux/Actions/SurveyAction'
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';

const theme = createTheme();

export default function Survey(props) {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { fields, append } = useFieldArray({
        control,
        name: "surveyForm"
    });
    const dispatch = useDispatch();
    const surveyForm = useSelector((state) => state.formBuilder.surveyForm);

    useEffect(() => {
        getFormData();
    }, [])

    const onSubmit = (data) => {
        data.form_id = surveyForm.id;
        const surveyFeedback = [];
        data.surveyForm.forEach((item, index) => {
            const temp = {};
            temp.question_id = surveyForm.questions[index].id;
            temp.answer = Array.isArray(item.answer) ? item.answer.join(',') : item.answer;
            surveyFeedback.push(temp);
        })
        data.survey_feedback = surveyFeedback;
        delete data.surveyForm;
        dispatch(saveSurvey(data))
    };

    const getFormData = () => {
        dispatch(fetchForm(props.match.params.slug))
    }

    const navigateToHome = () => {
        props.history.push('/')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Survey For {surveyForm.form_name}
                    </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    {surveyForm.questions && surveyForm.questions.map((element, index) => (
                        <Box
                            key={element.id}
                            sx={{
                                marginTop: 4,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">
                                        {element.question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {element.answer_type == 1 &&
                                        <TextField
                                            fullWidth
                                            label="Answer"
                                            error={errors?.surveyForm && errors.surveyForm[index]?.answer ? true : false}
                                            helperText={errors?.surveyForm && errors.surveyForm[index]?.answer ? "Please enter answer" : ""}
                                            key={element.id}
                                            {...register(`surveyForm.${index}.answer`, { required: true })}
                                        />
                                    }
                                    {element.answer_type == 2 &&
                                        <FormControl error={errors?.surveyForm && errors.surveyForm[index]?.answer ? true : false} component="fieldset">
                                            <FormGroup>
                                                {element.choices.split(',').map((row, index1) => (
                                                    < FormControlLabel
                                                        key={row}
                                                        {...register(`surveyForm.${index}.answer`, { required: true })}
                                                        control={< Checkbox value={row} />} label={row} />
                                                ))}
                                                <FormHelperText>{errors?.surveyForm && errors.surveyForm[index]?.answer ? "Please select option" : ""}</FormHelperText>
                                            </FormGroup>
                                        </FormControl>
                                    }
                                    {element.answer_type == 3 &&
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Answer</FormLabel>
                                            <RadioGroup
                                                aria-label="gender"
                                                name="radio-buttons-group"
                                                key={element.id}
                                                {...register(`surveyForm.${index}.answer`, { required: true })}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <FormHelperText error={errors?.surveyForm && errors.surveyForm[index]?.answer ? true : false}>{errors?.surveyForm && errors.surveyForm[index]?.answer ? "Please select option" : ""}</FormHelperText>
                                        </FormControl>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
                <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
                    <Grid item xs={6}>
                        <Button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            color="error"
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={navigateToHome}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}