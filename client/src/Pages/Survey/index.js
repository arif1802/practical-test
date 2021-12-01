import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { fetchForm, saveSurvey } from '../../Redux/Actions/SurveyAction'
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';

const theme = createTheme();

export default function Survey(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const surveyForm = useSelector((state) => state.formBuilder.surveyForm);

    useEffect(() => {
        getFormData();
    }, [])

    const onSubmit = (data) => {
        data.form_builder_id = surveyForm.id;
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
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Survey Form
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">
                                    {surveyForm.question}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {surveyForm.answer_type == 1 &&
                                    <TextField
                                        fullWidth
                                        label="Answer"
                                        error={errors.answer ? true : false}
                                        helperText={errors.answer ? "Please enter answer" : ""}
                                        {...register("answer", { required: true })}
                                    />
                                }
                                {surveyForm.answer_type == 2 &&
                                    <FormControl error={errors.answer ? true : false} component="fieldset">
                                        <FormGroup>
                                            {surveyForm.choices.split(',').map((row, index) => (
                                                < FormControlLabel {...register("answer", { required: true })} key={row} control={< Checkbox value={row} />} label={row} />
                                            ))}
                                            <FormHelperText>{errors.answer ? "Please select option" : ""}</FormHelperText>
                                        </FormGroup>
                                    </FormControl>
                                }
                                {surveyForm.answer_type == 3 &&
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Answer</FormLabel>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="radio-buttons-group"
                                            {...register("answer", { required: true })}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        <FormHelperText error={errors.answer ? true : false}>{errors.answer ? "Please select option" : ""}</FormHelperText>
                                    </FormControl>
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3 }}
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
                                    sx={{ mt: 3 }}
                                    onClick={navigateToHome}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}