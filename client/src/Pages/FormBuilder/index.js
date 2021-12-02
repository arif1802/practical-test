import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import FormBuilderDialog from './Components/FormBuilderDialog';
import { getAnswerTypes, fetchForms, saveForm } from '../../Redux/Actions/FormBuilderAction'
import { useDispatch, useSelector } from "react-redux";
import FormBuilderService from '../../Services/FormBuilderService';
import { toast } from 'react-toastify';
import FormsListTable from './Components/FormsList';

const theme = createTheme();

export default function FormBuilder() {
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const answerTypes = useSelector((state) => state.formBuilder.answerTypes);
    const forms = useSelector((state) => state.formBuilder.forms);
    const questions = useSelector((state) => state.formBuilder.questions);

    useEffect(() => {
        fetchAnswerTypes();
        getForms();
    }, [])

    const handleQuestionDialog = () => {
        setOpenDialog(true);
    };

    const handleSubmitForm = async () => {
        if (!getValues('formName')) {
            toast.error("Please add form name");
            return;
        }
        if (!questions.length) {
            toast.error("Please add question first");
            return;
        }
        const checkIfFormExist = await FormBuilderService.checkFormExist({ formName: getValues('formName') });
        if (checkIfFormExist.success) {
            const body = {};
            body.form_name = getValues('formName');
            body.slug = getValues('formName').replace(new RegExp(" ", "g"), "-").toLowerCase();
            body.question = questions;
            reset();
            dispatch(saveForm(body))
        } else {
            toast.error(checkIfFormExist.msg)
        }
    }

    // Function to handle the dialog open/close
    const handleDialog = (data) => {
        setOpenDialog(data.value)
    }

    const fetchAnswerTypes = () => {
        dispatch(getAnswerTypes());
    };

    const getForms = () => {
        dispatch(fetchForms())
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 4,
                    }}
                >
                    <Typography sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} component="h1" variant="h5">
                        <strong>Create Form</strong>
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Form Name"
                                    error={errors.formName ? true : false}
                                    helperText={errors.formName ? "Please enter form name" : ""}
                                    {...register("formName", { required: true })}
                                />
                                {questions.length ?
                                    <Typography sx={{
                                        mt: 1
                                    }} component="h3" variant="h6">
                                        {`${questions.length} question added to ${getValues('formName')}`}
                                    </Typography> : ""
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                                <Button
                                    type="button"
                                    onClick={handleSubmit(handleQuestionDialog)}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Question
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="button"
                                    onClick={handleSubmitForm}
                                    fullWidth
                                    color="success"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Create Form
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Container>
                <FormsListTable forms={forms} />
            </Container>
            <FormBuilderDialog openDialog={openDialog} answerTypes={answerTypes} handleDialog={handleDialog} />
        </ThemeProvider>
    );
}